import { TmdbMediaType } from "../../tmdb/types";

export const queryKeys = {
  reviews: ({
    tmdbMediaId,
    tmdbMediaType,
  }: {
    tmdbMediaId: string;
    tmdbMediaType: TmdbMediaType;
  }) => ["reviews", tmdbMediaId, tmdbMediaType],

  currentUserReview: ({
    tmdbMediaId,
    tmdbMediaType,
  }: {
    tmdbMediaId: string;
    tmdbMediaType: TmdbMediaType;
  }) => ["user", "reviews", tmdbMediaId, tmdbMediaType],
};
