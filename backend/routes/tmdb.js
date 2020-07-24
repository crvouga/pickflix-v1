const express = require("express");
const router = express.Router();
const axios = require("axios");
const { camelizeKeys, decamelizeKeys, decamelize } = require("humps");
const qs = require("qs");
const R = require("ramda");

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  paramsSerializer: R.pipe(
    R.assoc("apiKey", process.env.TMDB_API_KEY),
    decamelizeKeys,
    R.curry(qs.stringify)(R.__, { arrayFormat: "comma", encode: false })
  ),
  transformResponse: axios.defaults.transformResponse.concat(camelizeKeys),
});

router.get("*", async (req, res) => {
  try {
    const path = decamelize(req.path);
    const params = req.query;
    const response = await tmdb.get(path, {
      params: params,
    });
    res.status(response.status);
    res.json(response.data);
  } catch (e) {
    res.status(e.response.status);
    res.json(e.response.data);
  }
});

module.exports = router;
