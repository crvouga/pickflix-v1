import express from 'express';
import config from '../configuration';
import keyv from '../mongodb/keyv';
import qs from 'qs';
import axios, {AxiosRequestConfig} from 'axios';

const router = express.Router();

const stringifyConfig: qs.IStringifyOptions = {
  arrayFormat: 'comma',
  encode: false,
};

const timeToLive = 1000 * 60 * 60 * 24 * 7;

router.all('*', async (req, res, next) => {
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
});

export default router;
