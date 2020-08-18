const admin = require("../firebaseAdmin");
const AppUser = require("../db/AppUser");

module.exports = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebaseId = decodedToken.uid;

    const appUser = await AppUser.getOrCreate({ firebaseId });
    appUser.firebase = await admin.auth().getUser(firebaseId);
    req.appUser = appUser;
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
