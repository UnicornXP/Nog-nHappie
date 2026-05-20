const CACHE_NAME = "app2-pwa-cache-v1";
const OFFLINE_URL = "index.html";
const ASSETS_TO_CACHE = [
  "./index.html",
  "./index.css",
  "./index.js",
  "./manifest.webmanifest",
  "./Pages/login.html",
  "./Pages/login.css",
  "./Pages/login.js",
  "./Pages/home.html",
  "./Pages/home.css",
  "./Pages/home.js",
  "./Pages/public.html",
  "./Pages/public.css",
  "./Pages/public.js",
  "./Pages/settings.html",
  "./Pages/settings.css",
  "./Pages/settings.js",
  "./logo.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
            return networkResponse;
          }
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return networkResponse;
        })
        .catch(() => caches.match(OFFLINE_URL));
    })
  );
});
