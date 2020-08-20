const axios = require("axios");
const { camelizeKeys, decamelizeKeys, decamelize } = require("humps");
const config = require("../config");

const R = require("ramda");
const qs = require("qs");
const stringifyParams = R.curry(qs.stringify)(R.__, {
  arrayFormat: "comma",
  encode: false,
});

const paramsSerializer = (params) => {
  return stringifyParams(
    decamelizeKeys({ ...params, apiKey: config.TMDbAPIKey })
  );
};

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  paramsSerializer,
  transformResponse: axios.defaults.transformResponse.concat(camelizeKeys),
});

const request = async (axiosConfig) => {
  const response = await tmdb({
    ...axiosConfig,
    url: decamelize(axiosConfig.url),
  });
  const { data } = response;
  return data;
};

module.exports = { request };
