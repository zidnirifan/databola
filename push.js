const webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BHaFM87McDHkCJ0DkKUXXQ8WgR5etwouyinXWi0abKK5o-iY_dZJ6T5sjlNDpyEmzOpah8ERGZ8iZbKPlC8WBDc",
  privateKey: "BXlNc5BFg_dK3RUYd0S-s7yBBHTsWWwFahFM1niWcH8",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/dpWJZ4HM0Tk:APA91bF7MjP4YMG9jP4UI6oDOpz3nDGbUXxEp5B3yyUMSVNFRCm4RV6UtYr1xPRQNq8AdvaPTXv5JYDvUXbzpEyt9UZNoS1qnZIztpEXI3qFMv8IwErfiloafmINag8kKaGu8Ojjnm_s",
  keys: {
    p256dh:
      "BIfTq5IIr1pPk5wGXfjvEyIpo1wmTt2TRAyGjHX7thIjKtAjGcybYatnxhIZw+IKTIkBpI20YeYBxjLHI9622Ug=",
    auth: "LSOJPj96duJ0iXHrkC0Iaw==",
  },
};
const payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

const options = {
  gcmAPIKey: "51215764156",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
