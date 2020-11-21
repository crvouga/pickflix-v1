import { IUnitOfWork } from "../../common/unit-of-work/types";
import { requestTmdbData } from "./request-tmdb-data";
import { requestYoutubeData } from "./request-youtube-data";

export class MediaLogic {
  axios: any;
  keyv: any;
  unitOfWork: IUnitOfWork;

  constructor({
    axios,
    keyv,
    unitOfWork,
  }: {
    axios: any;
    keyv: any;
    unitOfWork: IUnitOfWork;
  }) {
    this.axios = axios;
    this.keyv = keyv;
    this.unitOfWork = unitOfWork;
  }

  requestTmdbData = requestTmdbData;
  requestYoutubeData = requestYoutubeData;
}
