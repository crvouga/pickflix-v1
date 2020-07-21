const express = require("express");
const axios = require("axios");
const Keyv = require("keyv");
const qs = require("qs");
const R = require("ramda");

const router = express.Router();

const cache = new Keyv(process.env.MONGODB_CONNECTION_URI);
cache.on("error", (err) => {
  console.log("mongodb connection Error", err);
});

const stringifyParams = R.curry(qs.stringify)(R.__, {
  arrayFormat: "comma",
  encode: false,
});

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  paramsSerializer: R.pipe(
    R.assoc("key", process.env.YOUTUBE_API_KEY),
    stringifyParams
  ),
});

const timeToLive = 1000 * 60 * 60 * 24 * 7;

router.get("*", async (req, res) => {
  const path = req.path;
  const params = req.query;
  const cacheKey = `${path}?${stringifyParams(params)}`;
  const cacheRawValue = await cache.get(cacheKey, { raw: true });

  if (cacheRawValue) {
    const value = cacheRawValue.value;
    value.meta = {
      message: "data from cache",
      expires: cacheRawValue.expires,
    };
    return res.json(value);
  }

  try {
    const response = await youtube.get(path, {
      params: params,
    });
    await cache.set(cacheKey, response.data, timeToLive);
    res.status(response.status);
    response.data.meta = {
      message: "data from youtube",
    };
    return res.json(response.data);
  } catch (e) {
    res.status(e.response.status);
    return res.json(e.response.data);
  }
});

module.exports = router;
