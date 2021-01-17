import { ICache } from "../../app/persistence/cache/types";
import { PaginationOptions } from "../../common/pagination";
import { UserId } from "../../users/models";
import { Json } from "../../common/utils";
import {
  makeTmdbDiscoverTags,
  TmdbDiscoverTagsId,
} from "../models/tmdb-discover-tags";
import { ITmdbDiscoverTagsRepository } from "../repositories/TmdbDiscoverTagsRepository";
import { requestTmdbData } from "./request-tmdb-data";
import { requestYoutubeData } from "./request-youtube-data";

export class MediaLogic {
  axios: any;
  cache: ICache<string, string>;
  tmdbDiscoverTagsRepository: ITmdbDiscoverTagsRepository;

  constructor({
    tmdbDiscoverTagsRepository,
    axios,
    cache,
  }: {
    tmdbDiscoverTagsRepository: ITmdbDiscoverTagsRepository;
    axios: any;
    cache: ICache<string, string>;
  }) {
    this.axios = axios;
    this.cache = cache;
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
