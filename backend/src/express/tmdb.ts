import axios from 'axios';
import express from 'express';
import {camelizeKeys, decamelize, decamelizeKeys} from 'humps';
import qs from 'qs';
import config from '../configuration';

const stringifyConfig: qs.IStringifyOptions = {
  arrayFormat: 'comma',
  encode: false,
};

const router = express.Router();

export default (app: express.IRouter) => {
  app.use('/tmdb', router);

  router.all('*', async (req, res, next) => {
    const params = decamelizeKeys({
      ...req.query,
      apiKey: config.TMDbAPIKey,
    });

    const url =
      decamelize(req.path) + '?' + qs.stringify(params, stringifyConfig);

    try {
      const tmdbResponse = await axios.get(
        'https://api.themoviedb.org/3' + url
      );
      const data = camelizeKeys(tmdbResponse.data);
      res.json(data);
    } catch (error) {
      next(error);
    }
  });
  return router;
};
