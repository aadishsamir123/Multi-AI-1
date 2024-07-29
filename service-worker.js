// This is the service worker for handling installation and fetch events.

self.addEventListener('install', event => {
    // Skip waiting to immediately activate the new service worker.
    self.skipWaiting();
    console.log('Service Worker installed');
});

self.addEventListener('activate', event => {
    // Claim control of all clients (open tabs) as soon as the service worker is activated.
    event.waitUntil(self.clients.claim());
    console.log('Service Worker activated');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            // No cached response or fallback provided.
            // You can customize this if needed.
        })
    );
});
