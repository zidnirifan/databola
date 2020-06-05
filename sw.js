const CACHE_NAME = "databola-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/src/css/main.css",
  "/src/js/main.js",
  "/src/js/api.js",
  "/lib/css/materialize.min.css",
  "/lib/js/materialize.min.js",
  "/assets/icons/Material-Icons.woff2",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
