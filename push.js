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
    "https://fcm.googleapis.com/fcm/send/dq6biyREBrg:APA91bH9o4UbRGTPzNO8HMnRjO7rJpZEchjZcM5b6XWXcaValYuEGm4isqCXeTcmQ6BtTQTjoxGaOFsxD4uSUe2NBHyD8c6fQ2PhvyqS0GWWt6OGhN0fgrm-6V_wYx5ug7WpcOp8qihH",
  keys: {
    p256dh:
      "BJsOv5Dspnx2vA/UBssQZW8hn/b/s5ykUVtGJql+Ks91fpDkT6dTc+o7DdULIw/h/0FnSCkbe8h8gPe6OyYmJMY=",
    auth: "+GusW+kUUOuFZuQ6sBK/tg==",
  },
};
const payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

const options = {
  gcmAPIKey: "51215764156",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
