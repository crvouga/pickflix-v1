import { AxiosRequestConfig } from "axios";
import { HashMapCache } from "../../app/persistence/cache/cache.hash-map";
import { TmdbDiscoverTagsRepositoryHashMap } from "../repositories/TmdbDiscoverTagsRepository";
import { MediaLogic } from "./logic";

const axiosStub = async (_: AxiosRequestConfig) => ({
  data: {},
});

export const buildMediaLogicTest = () => {
  const tmdbDiscoverTagsRepository = new TmdbDiscoverTagsRepositoryHashMap();

  const mediaLogic = new MediaLogic({
    tmdbDiscoverTagsRepository,
    cache: new HashMapCache(),
    axios: axiosStub,
  });

  return { mediaLogic };
};
