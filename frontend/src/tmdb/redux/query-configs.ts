import * as R from "ramda";
import { QueryConfig } from "redux-query";
import { backendURL } from "../../backendAPI";
import { normalizeData, schema } from "../../redux/query/normalize";
import { TmdbMedia } from "../types";
import { EntityKeys, Movie, movieSchema } from "./entities";

const mergeDeepRight = (previous = {}, next = {}) =>
  R.mergeDeepRight(previous, next);

export const movieRequest = ({
  tmdbMediaId,
  params,
}: {
  tmdbMediaId: string;
  params: Record<string, string>;
}): QueryConfig => {
  return {
    url: `${backendURL}/api/tmdb/movie/${tmdbMediaId}?${new URLSearchParams(
      params
    ).toString()}`,

    transform: (data: Movie[]) => {
      const normalized = normalizeData<EntityKeys, Movie[]>(
        data,
        new schema.Array(movieSchema)
      );
      return normalized.entities;
    },

    update: {
      [EntityKeys.movie]: mergeDeepRight,
      [EntityKeys.person]: mergeDeepRight,
    },
  };
};

export const tmdbMediaToEntityId = ({
  tmdbMediaType,
  tmdbMediaId,
}: TmdbMedia) => `${tmdbMediaType}/${tmdbMediaId}`;

export const isLikedRequest = (tmdbMedia: TmdbMedia): QueryConfig => {
  const { tmdbMediaId, tmdbMediaType } = tmdbMedia;

  const queryString = new URLSearchParams({
    tmdbMediaId,
    tmdbMediaType,
  }).toString();

  return {
    force: true,

    url: `${backendURL}/api/like/?${queryString}`,

    transform: ({ isLiked }: { isLiked: boolean }) => {
      return {
        likes: {
          [tmdbMediaToEntityId(tmdbMedia)]: isLiked,
        },
      };
    },

    update: {
      likes: mergeDeepRight,
    },
  };
};

export const addLikeMutation = (tmdbMedia: TmdbMedia): QueryConfig => {
  return {
    options: {
      method: "POST",
    },
    url: `${backendURL}/api/like`,
    body: tmdbMedia,
    transform: () => {
      return {
        likes: {
          [tmdbMediaToEntityId(tmdbMedia)]: true,
        },
      };
    },
    update: {
      likes: (
        prev: { [id: string]: boolean },
        next: { [id: string]: boolean }
      ) => {
        return {
          ...prev,
          ...next,
        };
      },
    },
  };
};

export const removeLikeMutation = (tmdbMedia: TmdbMedia): QueryConfig => {
  return {
    options: {
      method: "DELETE",
    },
    url: `${backendURL}/api/like`,
    body: tmdbMedia,
    update: {
      likes: (
        prev: { [id: string]: boolean },
        next: { [id: string]: boolean }
      ) => {
        return R.dissoc(tmdbMediaToEntityId(tmdbMedia), prev);
      },
    },
  };
};
