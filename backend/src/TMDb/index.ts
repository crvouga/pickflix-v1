import axios from 'axios';
import {camelizeKeys, decamelize, decamelizeKeys} from 'humps';
import qs from 'qs';
import config from '../configuration';
import keyv from '../storage/mongodb/keyv';
import {TMDb, Request} from './types';

const stringifyConfig: qs.IStringifyOptions = {
  arrayFormat: 'comma',
  encode: false,
};

const timeToLive = 1000 * 60 * 60 * 24 * 1;

export const request: Request = async ({path, query}) => {
  const params = decamelizeKeys({
    ...query,
    apiKey: config.TMDbAPIKey,
  });

  const url = decamelize(path) + '?' + qs.stringify(params, stringifyConfig);

  const cahcedResponse = await keyv.get(url);

  if (cahcedResponse) {
    return cahcedResponse;
  }

  const tmdbResponse = await axios.get('https://api.themoviedb.org/3' + url);
  const data = camelizeKeys(tmdbResponse.data);
  await keyv.set(url, data, timeToLive);

  return data;
};
