const express = require("express");
const YoutubeService = require("../../business/youtube");
const router = express.Router();

router.all("*", async (req, res, next) => {
  try {
    const data = await YoutubeService.request({
      method: req.method,
      url: req.path,
      params: req.query,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
