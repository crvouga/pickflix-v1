import { AxiosRequestConfig } from "axios";
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

  const mediaLogic = new MediaLogic({
    keyv,
    axios: axiosStub,
  });

  return { mediaLogic };
};
