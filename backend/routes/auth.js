const express = require("express");
const router = express.Router();
const admin = require("../firebaseAdmin");
const authenticated = require("../middlewares/authenticated");

router.post("/sessionSignIn", async (req, res) => {
  try {
    const idToken = req.body.idToken;
    const expiresIn = 1000 * 60 * 60 * 24 * 7;
    const sessionCookie = await admin.auth().createSessionCookie(idToken, {
      expiresIn,
    });
    const options = {
      maxAge: expiresIn,
      httpOnly: false,
      secure: false,
      domain: null,
    };
    res.cookie("session", sessionCookie, options);
    res.json({ status: "success" });
  } catch (error) {
    res.status(401);
    res.json({ status: "error", error });
  }
});

router.post("/sessionSignOut", async (req, res) => {
  res.clearCookie("session");
  res.json({ status: "success" });
});

router.get("/user", authenticated, (req, res) => {
  res.json({ user: req.user });
});

router.delete("/user", authenticated, async (req, res) => {
  try {
    const uid = req.user.uid;
    await admin.auth().deleteUser(uid);
    res.json({ status: "success", message: "User was successfully deleted" });
  } catch (error) {
    res.json({ status: "error", error });
  }
});

module.exports = router;
