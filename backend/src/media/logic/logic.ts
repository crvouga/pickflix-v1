import { PaginationOptions } from "../../app/pagination";
import { UserId } from "../../users/models";
import {
  makeTmdbDiscoverTags,
  TmdbDiscoverTagsId,
} from "../models/tmdb-discover-tags";
import { ITmdbDiscoverTagsRepository } from "../repositories/TmdbDiscoverTagsRepository";
import { requestTmdbData } from "./request-tmdb-data";
import { requestYoutubeData } from "./request-youtube-data";
import { Json } from "../../utils";

export class MediaLogic {
  axios: any;
  keyv: any;
  tmdbDiscoverTagsRepository: ITmdbDiscoverTagsRepository;

  constructor({
    tmdbDiscoverTagsRepository,
    axios,
    keyv,
  }: {
    tmdbDiscoverTagsRepository: ITmdbDiscoverTagsRepository;
    axios: any;
    keyv: any;
  }) {
    this.axios = axios;
    this.keyv = keyv;
    this.tmdbDiscoverTagsRepository = tmdbDiscoverTagsRepository;
  }

  requestTmdbData = requestTmdbData;
  requestYoutubeData = requestYoutubeData;

  async addTmdbDiscoverTags({
    userId,
    key,
    tagsById,
  }: {
    userId: UserId;
    key: string;
    tagsById: Json;
  }) {
    const [found] = await this.tmdbDiscoverTagsRepository.find({
      userId,
      key,
    });

    if (found) {
      await this.tmdbDiscoverTagsRepository.remove(found.id);
    }

    const tmdbDiscoverTags = makeTmdbDiscoverTags({
      userId,
      key,
      tagsById,
    });

    await this.tmdbDiscoverTagsRepository.add(tmdbDiscoverTags);
  }

  async removeTmdbDiscoverTags({
    userId,
    id,
  }: {
    userId: UserId;
    id: TmdbDiscoverTagsId;
  }) {
    const found = await this.tmdbDiscoverTagsRepository.find({
      id,
      userId,
    });

    if (found.length > 0) {
      await this.tmdbDiscoverTagsRepository.remove(id);
    }
  }

  async getTmdbDiscoverTags(
    {
      userId,
    }: {
      userId: UserId;
    },
    pagination: PaginationOptions
  ) {
    const found = await this.tmdbDiscoverTagsRepository.find(
      {
        userId,
      },
      {
        orderBy: [["createdAt", "descend"]],
        pagination,
      }
    );

    return found;
  }
}
