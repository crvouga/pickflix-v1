import qs from "qs";
import { MediaLogic } from "../logic";
import { secrets } from "../../../config";

const stringifyConfig: qs.IStringifyOptions = {
  arrayFormat: "comma",
  encode: false,
};

const ONE_DAY = 1000 * 60 * 60 * 24;

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

export async function requestYoutubeData(
  this: MediaLogic,
  {
    path,
    query,
  }: {
    path: string;
    query?: { [key: string]: string };
  }
) {
  const params = {
    ...query,
    key: secrets.youtubeApiKey,
  };

  const url = path + "?" + qs.stringify(params, stringifyConfig);

  const cached = await this.cache.get(url);

  if (cached) {
    return cached;
  }

  const { data } = await this.axios.get(YOUTUBE_API_URL + url);

  await this.cache.set(url, data, ONE_DAY * 3);

  return data;
}
