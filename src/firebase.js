// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzeRY7RYox42t6Cpy33TQRmzTmlxt8lKo",
  authDomain: "push-notification-ea1fa.firebaseapp.com",
  projectId: "push-notification-ea1fa",
  storageBucket: "push-notification-ea1fa.firebasestorage.app",
  messagingSenderId: "545562261821",
  appId: "1:545562261821:web:26691e6028aad5e4dbed54",
  measurementId: "G-B02Q5ZDQV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
export { messaging, getToken, onMessage };