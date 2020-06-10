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
    "https://fcm.googleapis.com/fcm/send/dK4HCmJcu4U:APA91bFQDDSZEvS9uAASNmtp3VfELSzauY0VaeL4A64k4L2zJuQEP5DNV6x1owqr_4h0zDSgqPTUJsR_pH7nsjnMcxkl8MoeyM7g-WM3jFZqdBFqjNwCxikSYhKcPUwi3Xjw-ouNj7jb",
  keys: {
    p256dh:
      "BI4L7lVabF14iip4FSc9xNiiPLSZHfeA0lh6Up+wcUvRfR8rY6fLKk0o989g3ewo4zbNARzsSeNX52LYA3q1LQQ=",
    auth: "e11Kq9icOuoKzr3o1OS8kA==",
  },
};
const payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

const options = {
  gcmAPIKey: "51215764156",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
