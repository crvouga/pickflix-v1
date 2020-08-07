const admin = require("../firebaseAdmin");

module.exports = async (req, res, next) => {
  try {
    const sessionCookie = req.cookies.session || "";
    const checkForRevocation = true;
    const decodedIdToken = await admin
      .auth()
      .verifySessionCookie(sessionCookie, checkForRevocation);
    const uid = decodedIdToken.uid;
    const user = await admin.auth().getUser(uid);
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    res.json({
      message: "authenticated middleware failed",
      status: "error",
      error,
      cookies: req.cookies,
    });
  }
};
