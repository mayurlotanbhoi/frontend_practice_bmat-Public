// public/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

// Initialize Firebase with compat SDK
firebase.initializeApp({
  apiKey: "AIzaSyAzeRY7RYox42t6Cpy33TQRmzTmlxt8lKo",
  authDomain: "push-notification-ea1fa.firebaseapp.com",
  projectId: "push-notification-ea1fa",
  storageBucket: "push-notification-ea1fa.firebasestorage.app",
  messagingSenderId: "545562261821",
  appId: "1:545562261821:web:26691e6028aad5e4dbed54",
  measurementId: "G-B02Q5ZDQV4",
});

const messaging = firebase.messaging();


messaging.onBackgroundMessage(payload => {
  console.log('[SW] Received background message:', payload);

  const {
    title = 'Notification',
    body = 'You have a new message.',
    imageUrl,
    icon = '/icons/icon-192x192.png',
    badge = '/icons/badge-icon.png',
    url = '/',
  } = payload.data || {};

  const notificationOptions = {
    body,
    icon,
    badge,
    image: imageUrl,
    data: { click_action_url: url },
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: '/icons/open-icon.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/close-icon.png'
      }
    ]
  };

  self.registration.showNotification(title, notificationOptions);
});

// Handle click on notification
self.addEventListener('notificationclick', event => {
  event.notification.close();

  const redirectUrl = event.notification.data?.click_action_url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        if (client.url === redirectUrl && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(redirectUrl);
    })
  );
});


// messaging.onBackgroundMessage(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   const title = payload.data.title;
//   const options = {
//     body: payload.data.body,
//     icon: '/icons/icon-192x192.png',
//     image: payload.data.imageUrl,
//     data: {
//       click_action_url: payload.data.url
//     }
//   };

//   self.registration.showNotification(title, options);
// });

// self.addEventListener('notificationclick', function(event) {
//   event.notification.close();
//   const url = event.notification.data.click_action_url || '/';
//   event.waitUntil(clients.openWindow(url));
// });

// self.addEventListener('notificationclick', function(event) {
//   event.notification.close();
//   const url = event.notification.data.click_action_url || '/';
//   event.waitUntil(clients.openWindow(url));
// });
