// src/hooks/useFirebaseMessaging.ts
import { useEffect } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAzeRY7RYox42t6Cpy33TQRmzTmlxt8lKo",
  authDomain: "push-notification-ea1fa.firebaseapp.com",
  projectId: "push-notification-ea1fa",
  storageBucket: "push-notification-ea1fa.firebasestorage.app",
  messagingSenderId: "545562261821",
  appId: "1:545562261821:web:26691e6028aad5e4dbed54",
  measurementId: "G-B02Q5ZDQV4",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const useFirebaseMessaging = () => {
  useEffect(() => {
    async function requestPermissionAndToken() {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          console.warn('Notification permission denied');
          return;
        }

        console.log('Notification permission granted.');

        const token = await getToken(messaging, {
          vapidKey: "BKu5onkuM7rkxFBTo1jEJ_PTno0D_IDPK-_t3Bnr05egp-oZ_ixE1_yTSRQ6TSJhbBp97NrbdzC6WrZ3MgHyIY8",
        });

        if (token) {
          console.log("FCM Token:", token);
          await fetch("http://localhost:5000/save-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });
        } else {
          console.warn("No FCM token available.");
        }
      } catch (err) {
        console.error("Error during FCM setup:", err);
      }
    }

    requestPermissionAndToken();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      // Optional: show UI feedback like a toast
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        }).catch((err) => {
          console.error('Service Worker registration failed:', err);
        });
    }
  }, []);
};
