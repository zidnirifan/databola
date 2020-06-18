importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

const { precacheAndRoute } = workbox.precaching;
const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate } = workbox.strategies;

precacheAndRoute([
  { url: "/index.html", revision: "1" },
  { url: "/app.js", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/favicon.ico", revision: "1" },
  { url: "/src/css/main.css", revision: "1" },
  { url: "/src/js/main.js", revision: "1" },
  { url: "/src/js/api.js", revision: "1" },
  { url: "/src/js/register-sw.js", revision: "1" },
  { url: "/src/js/db.js", revision: "1" },
  { url: "/src/js/req-permission.js", revision: "1" },
  { url: "/src/js/uint8Array.js", revision: "1" },
  { url: "/src/js/component/nav-desktop.js", revision: "1" },
  { url: "/src/js/component/nav-mobile.js", revision: "1" },
  { url: "/src/js/component/topbar-mobile.js", revision: "1" },
  { url: "/src/js/component/team-item.js", revision: "1" },
  { url: "/src/js/component/match-item.js", revision: "1" },
  { url: "/src/js/component/team-details.js", revision: "1" },
  { url: "/lib/css/materialize.min.css", revision: "1" },
  { url: "/lib/js/materialize.min.js", revision: "1" },
  { url: "/lib/js/idb.js", revision: "1" },
  { url: "/assets/images/image-error.svg", revision: "1" },
  { url: "/assets/icons/Material-Icons.woff2", revision: "1" },
  { url: "/assets/icons/icons.css", revision: "1" },
  { url: "/assets/icons/icon-72.png", revision: "1" },
  { url: "/assets/icons/icon-96.png", revision: "1" },
  { url: "/assets/icons/icon-128.png", revision: "1" },
  { url: "/assets/icons/icon-144.png", revision: "1" },
  { url: "/assets/icons/icon-192.png", revision: "1" },
  { url: "/assets/icons/icon-256.png", revision: "1" },
  { url: "/assets/icons/icon-384.png", revision: "1" },
  { url: "/assets/icons/icon-512.png", revision: "1" },
]);

registerRoute(
  /https:\/\/api\.football-data\.org\/v2/,
  new StaleWhileRevalidate({
    cacheName: "data-from-api",
  })
);

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
