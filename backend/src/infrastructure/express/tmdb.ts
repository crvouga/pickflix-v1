import express from 'express';
import config from '../configuration';
import axios, {AxiosRequestConfig} from 'axios';
import {camelizeKeys, decamelizeKeys, decamelize} from 'humps';
import qs from 'qs';

const stringifyConfig: qs.IStringifyOptions = {
  arrayFormat: 'comma',
  encode: false,
};

const router = express.Router();

router.all('*', async (req, res, next) => {
  const params = decamelizeKeys({
    ...req.query,
    apiKey: config.TMDbAPIKey,
  });

  const url =
    decamelize(req.path) + '?' + qs.stringify(params, stringifyConfig);

  try {
    const tmdbResponse = await axios.get('https://api.themoviedb.org/3' + url);
    const data = camelizeKeys(tmdbResponse.data);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
