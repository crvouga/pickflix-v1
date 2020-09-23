import {TmdbLogic} from './build';
import {AxiosRequestConfig} from 'axios';

const buildKeyvFake = () => {
  const keyvMap = new Map<any, any>();
  const keyv = {
    set: async (k: any, v: any) => keyvMap.set(k, v),
    get: async (k: any) => keyvMap.get(k),
  };
  return {
    keyvMap,
    keyv,
  };
};

export const buildTmdbLogicFake = () => {
  const {keyv, keyvMap} = buildKeyvFake();

  const tmdbLogic = new TmdbLogic({
    keyv,
    axios: async (_: AxiosRequestConfig) => ({
      data: {},
    }),
  });

  return {
    keyv,
    keyvMap,
    tmdbLogic,
  };
};
