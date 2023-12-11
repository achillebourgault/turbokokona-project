import { skipWaiting, clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { NetworkOnly, NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute, setDefaultHandler, setCatchHandler } from 'workbox-routing';
import { matchPrecache, precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

skipWaiting();
clientsClaim();

// must include following lines when using inject manifest module from workbox
// https://developers.google.com/web/tools/workbox/guides/precache-files/workbox-build#add_an_injection_point
const WB_MANIFEST = self.__WB_MANIFEST;
// Precache fallback route and image
WB_MANIFEST.push({
    url: '/fallback',
    revision: '1234567890',
});
precacheAndRoute(WB_MANIFEST);

cleanupOutdatedCaches();
registerRoute(
    '/',
    new NetworkFirst({
        cacheName: 'start-url',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 1,
                maxAgeSeconds: 86400,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
);
registerRoute(
    /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
    new CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 4,
                maxAgeSeconds: 31536e3,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
);
registerRoute(
    /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    new StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 4,
                maxAgeSeconds: 604800,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
);
// disable image cache, so we could observe the placeholder image when offline
registerRoute(
    /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    new NetworkOnly({
        cacheName: 'static-image-assets',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 64,
                maxAgeSeconds: 86400,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
);
registerRoute(
    /\.(?:js)$/i,
    new StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 86400,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
);
registerRoute(
    /\.(?:css|less)$/i,
    new StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 86400,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
);
registerRoute(
    /\.(?:json|xml|csv)$/i,
    new NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 86400,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
);
registerRoute(
    /\/api\/.*$/i,
    new NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
            new ExpirationPlugin({
                maxEntries: 16,
                maxAgeSeconds: 86400,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
);
registerRoute(
    /.*/i,
    new NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
            new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 86400,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
);

self.addEventListener('install', function (event) {
	console.info('Event: Install');
	checkNetworkState();
});

self.addEventListener('push', function (event) {
    const data = JSON.parse(event.data.text())
    event.waitUntil(
      registration.showNotification(data.title, {
        body: data.message,
        icon: '/android-chrome-192x192.png'
      })
    )
  })
  
self.addEventListener('notificationclick', function (event) {
    event.notification.close()
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
        if (clientList.length > 0) {
            let client = clientList[0]
            for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
                client = clientList[i]
            }
            }
            return client.focus()
        }
        return clients.openWindow('/')
        })
    )
})

self.addEventListener('fetch', async function (event) {
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin')
		return;
	if (event.request.method === 'POST') {
		if(!navigator.onLine){
            console.log("Received offline post")
			//here you can check for specific urls to be saved in indexed db
			var authHeader = event.request.headers.get('Authorization');
			var reqUrl = event.request.url;
			Promise.resolve(event.request.text()).then((payload) => {
				//save offline requests to indexed db
				saveIntoIndexedDb(reqUrl, authHeader, payload, "POST")
			})
		}
		
	}
    if (event.request.method === 'DELETE') {
		if(!navigator.onLine){
            console.log("Received offline delete")
			//here you can check for specific urls to be saved in indexed db
			var authHeader = event.request.headers.get('Authorization');
			var reqUrl = event.request.url;
			Promise.resolve(event.request.text()).then((payload) => {
				//save offline requests to indexed db
				saveIntoIndexedDb(reqUrl, authHeader, payload, "DELETE")
			})
		}
		
	}
});

function checkNetworkState() {
	setInterval(function () {
        console.log("RefreshBeforeOnline")
		if (navigator.onLine) {
            console.log("RefreshSendPost")
			sendOfflinePostRequestsToServer()
		}
	}, 3000);
}

async function sendOfflinePostRequestsToServer() {
	var request = indexedDB.open("TrayTrackingPostDB");
	request.onsuccess = function (event) {
		var db = event.target.result;
		var tx = db.transaction('postrequest', 'readwrite');
		var store = tx.objectStore('postrequest');
		var allRecords = store.getAll();
        console.log("Sending Posts")
		allRecords.onsuccess = function () {

			if (allRecords.result && allRecords.result.length > 0) {

				var records = allRecords.result
				//make recursive call to hit fetch requests to server in a serial manner
				var resp = sendFetchRequestsToServer(
					fetch(records[0].url, {
						method: records[0].method,
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json',
							'Authorization': records[0].authHeader
						},
						body: records[0].payload
					}), records[0].url, records[0].authHeader, records[0].payload, records.slice(1))

				for (var i = 0; i < allRecords.result.length; i++)
					store.delete(allRecords.result[i].id)
			}
		};
	}
	request.onupgradeneeded = function (event) {
		var db = event.target.result;
		db.onerror = function (event) {
			console.log("Why didn't you allow my web app to use IndexedDB?!");
		};

		var objectStore;
		if (!db.objectStoreNames.contains('postrequest')) {
			objectStore = db.createObjectStore("postrequest", { keyPath: 'id', autoIncrement: true });
		}
		else {
			objectStore = db.objectStoreNames.get('postrequest');
		}
	}
}

function saveIntoIndexedDb(url, authHeader, payload, method) {
    console.log("Saving to indexDB")
	var myRequest = {};
	var jsonPayLoad = JSON.parse(payload)
	//add payload if required. If not skip parsing json and stringifying it again
	//jsonPayLoad['eventTime'] = getCurrentTimeString(eventTime)
	myRequest.url = url;
	myRequest.authHeader = authHeader;
	myRequest.payload = JSON.stringify(jsonPayLoad);
    myRequest.method = method;
	var request = indexedDB.open("TrayTrackingPostDB");
	request.onsuccess = function (event) {
		var db = event.target.result;
		var tx = db.transaction('postrequest', 'readwrite');
		var store = tx.objectStore('postrequest');
		store.add(myRequest)
	}
}

async function sendFetchRequestsToServer(data, reqUrl, authHeader, payload, records) {

	let promise = Promise.resolve(data).then((response) => {

		console.log('Successfully sent request to server')
		if (records.length != 0) {

			sendFetchRequestsToServer(
				fetch(records[0].url, {
					method: records[0].method,
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': records[0].authHeader
					},
					body: records[0].payload
				}), records[0].url, records[0].authHeader, records[0].payload, records.slice(1))
		}
		return true
	}).catch((e) => {
		//fetch fails only in case of network error. Fetch is successful in case of any response code
		console.log('Exception while sending post request to server' + e)
		saveIntoIndexedDb(reqUrl, authHeader, payload)
	})
}


// following lines gives you control of the offline fallback strategies
// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#comprehensive_fallbacks

// Use a stale-while-revalidate strategy for all other requests.
setDefaultHandler(new StaleWhileRevalidate());

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
setCatchHandler(({ event }) => {
    // The FALLBACK_URL entries must be added to the cache ahead of time, either
    // via runtime or precaching. If they are precached, then call
    // `matchPrecache(FALLBACK_URL)` (from the `workbox-precaching` package)
    // to get the response from the correct cache.
    //
    // Use event, request, and url to figure out how to respond.
    // One approach would be to use request.destination, see
    // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
    switch (event.request.destination) {
        case 'document':
            // If using precached URLs:
            return matchPrecache('/fallback');
            // return caches.match('/fallback')
            break;
        case 'image':
            // If using precached URLs:
            return matchPrecache('/static/images/fallback.png');
            // return caches.match('/static/images/fallback.png')
            break;
        case 'font':
        // If using precached URLs:
        // return matchPrecache(FALLBACK_FONT_URL);
        // return caches.match('/static/fonts/fallback.otf')
        // break
        default:
            // If we don't have a fallback, just return an error response.
            return Response.error();
    }
});