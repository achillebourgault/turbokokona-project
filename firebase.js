// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBab-Zc_66chlKkRJ2IywgFSpRbWYDDafc",
  authDomain: "turbokokona.firebaseapp.com",
  projectId: "turbokokona",
  storageBucket: "turbokokona.appspot.com",
  messagingSenderId: "320360644000",
  appId: "1:320360644000:web:31ccc0277c63b4351cf8c5",
  measurementId: "G-WDSDKC920E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;