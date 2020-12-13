import { AxiosRequestConfig } from "axios";
import { TmdbDiscoverTagsRepositoryHashMap } from "../repositories/TmdbDiscoverTagsRepository";
import { MediaLogic } from "./logic";

const buildKeyvStub = () => {
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

const axiosStub = async (_: AxiosRequestConfig) => ({
  data: {},
});

export const buildMediaLogicTest = () => {
  const { keyv, keyvMap } = buildKeyvStub();

  const tmdbDiscoverTagsRepository = new TmdbDiscoverTagsRepositoryHashMap();

  const mediaLogic = new MediaLogic({
    tmdbDiscoverTagsRepository,
    keyv,
    axios: axiosStub,
  });

  return { mediaLogic };
};
