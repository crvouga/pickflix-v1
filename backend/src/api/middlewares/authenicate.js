const AppUserService = require("../../business/appUser");
const FirebaseService = require("../../business/firebase");

module.exports = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization;
    if (!idToken) {
      throw new Error("Authorization Header Required");
    }
    const firebaseUser = await FirebaseService.getUser({ idToken });
    const firebaseId = firebaseUser.uid;
    const appUser = await AppUserService.getOrCreate({ firebaseId });
    req.appUser = appUser;
    req.firebaseUser = firebaseUser;
    next();
  } catch (error) {
    res.status(401);
    next(error);
  }
};
