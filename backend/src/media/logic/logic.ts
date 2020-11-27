import { requestTmdbData } from "./request-tmdb-data";
import { requestYoutubeData } from "./request-youtube-data";

export class MediaLogic {
  axios: any;
  keyv: any;

  constructor({ axios, keyv }: { axios: any; keyv: any }) {
    this.axios = axios;
    this.keyv = keyv;
  }

  requestTmdbData = requestTmdbData;
  requestYoutubeData = requestYoutubeData;
}
