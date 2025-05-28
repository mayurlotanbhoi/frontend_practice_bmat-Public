


import  { Suspense, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import GoogleLogin from "./componets/GoogleLogin";
import { RouterProvider } from "react-router-dom";
import router from "./routing/Routing";

// const firebaseConfig = {
//   apiKey: "AIzaSyAzeRY7RYox42t6Cpy33TQRmzTmlxt8lKo",
//   authDomain: "push-notification-ea1fa.firebaseapp.com",
//   projectId: "push-notification-ea1fa",
//   storageBucket: "push-notification-ea1fa.firebasestorage.app",
//   messagingSenderId: "545562261821",
//   appId: "1:545562261821:web:26691e6028aad5e4dbed54",
//   measurementId: "G-B02Q5ZDQV4",
// };

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

function App() {
//   useEffect(() => {
//     async function requestPermission() {
//       try {
//         const permission = await Notification.requestPermission();
//         if (permission === "granted") {
//           console.log("Notification permission granted.");

//           const token = await getToken(messaging, {
//             vapidKey: "BKu5onkuM7rkxFBTo1jEJ_PTno0D_IDPK-_t3Bnr05egp-oZ_ixE1_yTSRQ6TSJhbBp97NrbdzC6WrZ3MgHyIY8",
//           });

//           if (token) {
//             console.log("FCM Token:", token);

//             // Send token to backend
//             await fetch("http://localhost:5000/save-token", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ token }),
//             });
//           } else {
//             console.log("No token available");
//           }
//         } else {
//           console.log("Notification permission denied.");
//         }
//       } catch (error) {
//         console.error("Error getting permission or token", error);
//       }
//     }

//     requestPermission();

//     // Optional: listen for foreground messages
//     onMessage(messaging, (payload) => {
//       console.log("Message received. ", payload);
//       // alert(`Push notification: ${payload.notification?.title} - ${payload.notification?.body}`);
//     });
//   }, []);

//   if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/firebase-messaging-sw.js')
//     .then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     }).catch((err) => {
//       console.error('Service Worker registration failed:', err);
//     });
// }

  return <div>
     <Suspense fallback={<h1>Loading...</h1>}>
        <RouterProvider router={router} />
      </Suspense>
  </div>;
}

export default App;





// import { useEffect, useState } from 'react';

// function App() {
//   const [messages, setMessages] = useState<{ title: string; message: string }[]>([]);

//   useEffect(() => {
//   if (Notification.permission !== 'granted') {
//     Notification.requestPermission();
//   }
// }, []);

//   useEffect(() => {
//     const socket = new WebSocket('ws://localhost:8080');

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);

//       // ✅ Show browser notification
//       if (Notification.permission === 'granted') {
//         new Notification(data.title, { body: data.message });
//       } else if (Notification.permission !== 'denied') {
//         Notification.requestPermission().then((permission) => {
//           if (permission === 'granted') {
//             new Notification(data.title, { body: data.message });
//           }
//         });
//       }

//       // ✅ Update UI
//       setMessages((prev) => [...prev, data]);
//     };

//     socket.onopen = () => console.log('WebSocket connected');
//     socket.onclose = () => console.log('WebSocket disconnected');

//     return () => socket.close();
//   }, []);

//   return (
//     <div className="App">
//       <h1>Push Notifications</h1>
//       <ul>
//         {messages.map((msg, idx) => (
//           <li key={idx}>
//             <strong>{msg.title}</strong>: {msg.message}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
