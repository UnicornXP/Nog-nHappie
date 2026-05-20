const CACHE_NAME = 'app1-shell-v1';
const PRECACHE_ASSETS = [
  'index.html',
  'index.css',
  'index.js',
  'i18n.js',
  'theme.js',
  'manifest.webmanifest',
  'Assets/Logo.svg',

  'Pages/login.html', 'Pages/login.css', 'Pages/login.js',
  'Pages/home.html', 'Pages/home.css', 'Pages/home.js',
  'Pages/public.html', 'Pages/public.css', 'Pages/public.js',
  'Pages/settings.html', 'Pages/settings.css', 'Pages/settings.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Navigation requests -> serve shell (index.html)
  if (req.mode === 'navigate'){
    event.respondWith(
      caches.match('index.html').then(cached => cached || fetch(req).then(res => {
        return caches.open(CACHE_NAME).then(cache => { cache.put('index.html', res.clone()); return res; });
      })).catch(()=> caches.match('index.html'))
    );
    return;
  }

  // For other requests, try cache first, then network and cache new resources
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        // only cache GET and successful responses
        if (req.method === 'GET' && res && res.status === 200 && req.url.startsWith(self.location.origin)){
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return res;
      }).catch(()=>{
        // If request is for an image and offline, could return a placeholder (not added).
        return; 
      });
    })
  );
});
