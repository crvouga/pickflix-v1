import { camelizeKeys, decamelize, decamelizeKeys } from "humps";
import qs from "qs";
import config from "../../../configuration";
import { MediaLogic } from "../build";

export async function requestTmdbData(
  this: MediaLogic,
  {
    path,
    query,
  }: {
    path: string;
    query?: {
      [key: string]: string;
    };
  }
) {
  const params = decamelizeKeys({
    ...query,
    apiKey: config.TMDB_API_KEY,
  });

  const url = [
    decamelize(path),
    "?",
    qs.stringify(params, {
      arrayFormat: "comma",
      encode: false,
    }),
  ].join("");

  const tmdbResponse = await this.axios({
    method: "get",
    url: "https://api.themoviedb.org/3" + url,
  });

  const data = camelizeKeys(tmdbResponse.data, (key, convert) => {
    // prevent conversion of keys containing only uppercase letters or numbers:
    return /[A-Z0-9]/.test(key) ? key : convert(key);
  });

  return data;
}
