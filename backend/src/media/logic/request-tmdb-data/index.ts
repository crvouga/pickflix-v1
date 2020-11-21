import { camelizeKeys, decamelize, decamelizeKeys } from "humps";
import qs from "qs";
import config from "../../../app/configuration";
import { MediaLogic } from "../build";
import { MediaId } from "../../models/types";

type Params = (
  | {
      mediaId: MediaId;
    }
  | {
      path: string;
    }
) & {
  query?: {
    [key: string]: string;
  };
};

export async function requestTmdbData(this: MediaLogic, params: Params) {
  const url = [
    decamelize(
      "mediaId" in params
        ? `/${params.mediaId.tmdbMediaType}/${params.mediaId.tmdbMediaId}`
        : params.path
    ),
    "?",
    qs.stringify(
      decamelizeKeys({
        ...params.query,
        apiKey: config.TMDB_API_KEY,
      }),
      {
        arrayFormat: "comma",
        encode: false,
      }
    ),
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
