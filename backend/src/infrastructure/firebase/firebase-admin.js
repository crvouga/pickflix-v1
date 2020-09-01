const admin = require("firebase-admin");
const env = require("../env");

admin.initializeApp({
  credential: admin.credential.cert(env.firebaseAdminServiceAccountKeyJSON),
  databaseURL: "https://pickflix.firebaseio.com",
});

module.exports = admin;
