import axios from 'axios';
import express from 'express';
import qs from 'qs';
import config from '../../configuration';
import keyv from '../../unit-of-work/mongodb/keyv';

const stringifyConfig: qs.IStringifyOptions = {
  arrayFormat: 'comma',
  encode: false,
};

const timeToLive = 1000 * 60 * 60 * 24 * 7;

export const buildYoutubeRouter = () => {
  const router = express.Router();

  router.use(
    '/youtube',
    express.Router().all('*', async (req, res, next) => {
      const params = {
        ...req.query,
        key: config.youtubeAPIKey,
      };

      const url = req.path + '?' + qs.stringify(params, stringifyConfig);

      try {
        const cached = await keyv.get(url);
        if (cached) {
          return res.json(cached);
        }
        const {data} = await axios.get(
          'https://www.googleapis.com/youtube/v3' + url
        );
        await keyv.set(url, data, timeToLive);
        res.json(data);
      } catch (error) {
        next(error);
      }
    })
  );

  return router;
};
