const webpush = require('web-push');

// VAPID keys should be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();
console.log("private key:" + vapidKeys.privateKey)
console.log("public key:" + vapidKeys.publicKey)