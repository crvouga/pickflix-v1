const config = require("../config");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(config.firebaseAdminServiceAccountKeyJSON),
  databaseURL: "https://pickflix.firebaseio.com",
});

const getUser = async ({ idToken }) => {
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const firebaseId = decodedToken.uid;
  return await admin.auth().getUser(firebaseId);
};

module.exports = { getUser };
