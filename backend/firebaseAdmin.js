//SOURCE: https://console.firebase.google.com/project/pickflix/settings/serviceaccounts/adminsdk
const admin = require("firebase-admin");

const serviceAccount = JSON.parse(
  process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY_JSON
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pickflix.firebaseio.com",
});

module.exports = admin;
