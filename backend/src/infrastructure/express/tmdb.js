const express = require("express");
const config = require("../env");
const axios = require("axios");
const { camelizeKeys, decamelizeKeys, decamelize } = require("humps");
const qs = require("qs");

const router = express.Router();

const stringifyConfig = {
  arrayFormat: "comma",
  encode: false,
};

router.all("*", async (req, res, next) => {
  const params = decamelizeKeys({
    ...req.query,
    apiKey: config.TMDbAPIKey,
  });

  const url =
    decamelize(req.path) + "?" + qs.stringify(params, stringifyConfig);

  const requestConfig = {
    method: req.method,
    baseURL: "https://api.themoviedb.org/3",
    url,
  };

  try {
    const tmdbResponse = await axios(requestConfig);
    const data = camelizeKeys(tmdbResponse.data);
    res.json(data);
  } catch (error) {
    console.log({ requestConfig, message: error.response.data });
    next(error);
  }
});

module.exports = router;
