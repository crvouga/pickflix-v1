const express = require("express");
const config = require("../env");
const keyv = require("../mongodb/keyv");
const router = express.Router();
const qs = require("qs");
const axios = require("axios");

const stringifyConfig = {
  arrayFormat: "comma",
  encode: false,
};

const timeToLive = 1000 * 60 * 60 * 24 * 7;

router.all("*", async (req, res, next) => {
  const params = {
    ...req.query,
    key: config.youtubeAPIKey,
  };

  const url = req.path + "?" + qs.stringify(params, stringifyConfig);

  const requestConfig = {
    method: req.method,
    baseURL: "https://www.googleapis.com/youtube/v3",
    url,
  };

  try {
    const cached = await keyv.get(url, { raw: true });
    if (cached) {
      return res.json(cached);
    }
    const { data } = await axios(requestConfig);
    await keyv.set(url, data, timeToLive);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
