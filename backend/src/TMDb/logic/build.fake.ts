import {buildTMDbLogic} from './build';
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

export const buildTMDbLogicFake = () => {
  const {keyv, keyvMap} = buildKeyvFake();

  const TMDbLogic = buildTMDbLogic({
    keyv,
    axios: async (_: AxiosRequestConfig) => ({
      data: {
        message: 'some data',
      },
    }),
  });

  return {
    keyv,
    keyvMap,
    TMDbLogic,
  };
};
