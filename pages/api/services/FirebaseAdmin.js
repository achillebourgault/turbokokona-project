import admin from 'firebase-admin'

import serviceAccount from '../../../serviceAccountKey.json'

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
}

const firestore = admin.firestore();

export { admin, firestore };