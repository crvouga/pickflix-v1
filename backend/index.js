require("dotenv").config();
const express = require("express");
const app = express();
require("./middlewares")(app);
require("./routes")(app);

const admin = require("firebase-admin");
const serviceAccount = JSON.parse(
  process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY_JSON
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pickflix.firebaseio.com",
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`express server listening on port ${PORT}`);
});
