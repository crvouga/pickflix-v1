const firebaseAdmin = require("./firebase-admin");
module.exports = async (idToken) => {
  const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
  const firebaseId = decodedToken.uid;
  const firebaseUser = await firebaseAdmin.auth().getUser(firebaseId);
  return firebaseUser;
};
