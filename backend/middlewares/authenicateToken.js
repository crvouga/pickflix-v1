const admin = require("../firebaseAdmin");

module.exports = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const user = await admin.auth().getUser(uid);
    req.user = user;
    next();
    return;
  } catch (error) {
    res.status(401);
    res.json({
      status: "error",
      error,
    });
    return;
  }
};
