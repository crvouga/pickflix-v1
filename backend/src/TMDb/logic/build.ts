import {camelizeKeys, decamelize, decamelizeKeys} from 'humps';
import qs from 'qs';
import config from '../../configuration';
import {Append, BuildTMDbLogic, Request} from './types';

const timeToLive = 1000 * 60 * 60 * 24 * 1;

export const buildTMDbLogic: BuildTMDbLogic = ({axios, keyv}) => {
  const request: Request = async ({path, query}) => {
    const params = decamelizeKeys({
      ...query,
      apiKey: config.TMDbAPIKey,
    });

    const url = [
      decamelize(path),
      '?',
      qs.stringify(params, {
        arrayFormat: 'comma',
        encode: false,
      }),
    ].join('');

    const cahced = await keyv.get(url);
    if (cahced) {
      return cahced;
    }

    const tmdbResponse = await axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3' + url,
    });

    const data = camelizeKeys(tmdbResponse.data);

    await keyv.set(url, data, timeToLive);

    return data;
  };

  const append: Append = async data => {
    const {tmdbMediaId, tmdbMediaType} = data;

    const tmdbData = await request({
      path: `/${tmdbMediaType}/${tmdbMediaId}`,
    });

    return {
      ...data,
      tmdbData,
    };
  };

  return {
    request,
    append,
  };
};
