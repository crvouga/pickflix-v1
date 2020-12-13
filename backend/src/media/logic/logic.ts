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
    serializedTagsById,
  }: {
    userId: UserId;
    serializedTagsById: Json;
  }) {
    const found = await this.tmdbDiscoverTagsRepository.find({
      userId,
      serializedTagsById,
    });

    if (found.length > 0) {
      throw new Error(
        "user already has tags saved that are associated with the unique key"
      );
    }

    const discoverTagsRecord = makeTmdbDiscoverTags({
      userId,
      serializedTagsById,
    });

    await this.tmdbDiscoverTagsRepository.add(discoverTagsRecord);
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
