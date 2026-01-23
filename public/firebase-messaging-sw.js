importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAmbPp8ycQQvHqoseGd2cQRhriW2_QeqVw",
  authDomain: "safe-you-d136d.firebaseapp.com",
  projectId: "safe-you-d136d",
  storageBucket: "safe-you-d136d.firebasestorage.app",
  messagingSenderId: "1094888655884",
  appId: "1:1094888655884:web:e40a5d75e4b6ea2df17229",
  measurementId: "G-1P0KQTBTEV"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

console.log('[Service Worker] Firebase Messaging inicializado');

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || 'Safe You';
  const notificationOptions = {
    body: payload.notification?.body || 'Você tem uma nova notificação',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: payload.data?.tag || 'default',
    requireInteraction: payload.data?.requireInteraction === 'true',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

