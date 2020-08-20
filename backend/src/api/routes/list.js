const express = require("express");
const { celebrate, Joi } = require("celebrate");
const authenicate = require("../middlewares/authenicate");
const router = express.Router();

router.get("/", authenicate, async (req, res, next) => {
  try {
    const appUserId = req.appUser.id;
    const results = await ListService.getAll({ appUserId });
    res.json({ results });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  celebrate({
    body: {
      name: Joi.string().max(100).required(),
    },
  }),
  authenicate,
  async (req, res, next) => {
    try {
      const listData = req.body;
      const appUserId = req.appUser.id;
      const list = await ListService.create({ appUserId, listData });
      res.json(list);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
