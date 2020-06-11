const CACHE_NAME = "databola-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/app.js",
  "/manifest.json",
  "/favicon.ico",
  "/src/css/main.css",
  "/src/js/main.js",
  "/src/js/api.js",
  "/src/js/register-sw.js",
  "/src/js/db.js",
  "/src/js/req-permission.js",
  "/src/js/uint8Array.js",
  "/src/js/component/nav-desktop.js",
  "/src/js/component/nav-mobile.js",
  "/src/js/component/topbar-mobile.js",
  "/src/js/component/team-item.js",
  "/src/js/component/match-item.js",
  "/src/js/component/team-details.js",
  "/lib/css/materialize.min.css",
  "/lib/js/materialize.min.js",
  "/lib/js/idb.js",
  "/asstes/images/image-error.svg",
  "/assets/icons/Material-Icons.woff2",
  "/assets/icons/icons.css",
  "/assets/icons/icon-72.png",
  "/assets/icons/icon-96.png",
  "/assets/icons/icon-128.png",
  "/assets/icons/icon-144.png",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-256.png",
  "/assets/icons/icon-384.png",
  "/assets/icons/icon-512.png",
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

self.addEventListener("push", (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  const options = {
    body,
    icon: "assets/icons/icon-256.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
