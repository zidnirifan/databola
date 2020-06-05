const CACHE_NAME = "databola-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/src/css/main.css",
  "/src/js/main.js",
  "/src/js/api.js",
  "/src/js/register-sw.js",
  "/lib/css/materialize.min.css",
  "/lib/js/materialize.min.js",
  "/assets/icons/Material-Icons.woff2",
  "/assets/icons/icons.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const baseUrl = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(baseUrl) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const response = await fetch(event.request);
        cache.put(event.request.url, response.clone());
        return response;
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`ServiceWorker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
