import { MediaLogic } from "./build";
import { AxiosRequestConfig } from "axios";
import { UnitOfWorkHashMap } from "../../unit-of-work/unit-of-work.fake";

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

export const buildMediaLogicFake = () => {
  const { keyv, keyvMap } = buildKeyvFake();

  const mediaLogic = new MediaLogic({
    keyv,
    axios: async (_: AxiosRequestConfig) => ({
      data: {},
    }),
    unitOfWork: new UnitOfWorkHashMap(),
  });

  return {
    keyv,
    keyvMap,
    mediaLogic,
  };
};
