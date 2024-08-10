// This is the "Offline copy of pages" service worker

const CACHE = "pwabuilder-offline";

importScripts("https://progressier.app/9CEI7z6N3ipSWbJSMkc4/sw.js" );
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);