import axios from "axios";
import qs from "qs";
import config from "../../../configuration";

import { MediaLogic } from "../build";

const stringifyConfig: qs.IStringifyOptions = {
  arrayFormat: "comma",
  encode: false,
};

const timeToLive = 1000 * 60 * 60 * 24 * 7;

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
    key: config.YOUTUBE_API_KEY,
  };

  const url = path + "?" + qs.stringify(params, stringifyConfig);

  const cached = await this.keyv.get(url);

  if (cached) {
    return cached;
  }

  const { data } = await this.axios.get(
    "https://www.googleapis.com/youtube/v3" + url
  );

  await this.keyv.set(url, data, timeToLive);

  return data;
}
