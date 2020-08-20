const axios = require("axios");
const config = require("../config");
const cache = require("../data/cache");

const R = require("ramda");
const qs = require("qs");
const stringifyParams = R.curry(qs.stringify)(R.__, {
  arrayFormat: "comma",
  encode: false,
});

const paramsSerializer = (params) => {
  return stringifyParams({ ...params, key: config.youtubeAPIKey });
};

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  paramsSerializer,
});

const timeToLive = 1000 * 60 * 60 * 24 * 7;
const makeCacheKey = ({ url, params }) => `${url}?${stringifyParams(params)}`;

const request = async (axiosConfig) => {
  const cacheKey = makeCacheKey(axiosConfig);
  const cacheRawValue = await cache.get(cacheKey, { raw: true });
  if (cacheRawValue) {
    const value = cacheRawValue.value;
    value.meta = {
      expires: cacheRawValue.expires,
    };
    return value;
  } else {
    const response = await youtube(axiosConfig);
    const { data } = response;
    await cache.set(cacheKey, data, timeToLive);
    return data;
  }
};

module.exports = { request };
