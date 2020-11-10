import { BackendAPI } from "../../backend-api";
import { TmdbMediaType } from "../../tmdb/types";
import { ReviewAggergation, ReviewStatistics } from "./types";

export const queryKeys = {
  reviews: (params: GetReviewsParams) => ["reviews", params],

  reviewStatistics: (params: GetReviewStatisticsParams) => [
    "reviews",
    "statistics",
    params,
  ],

  currentUserReview: ({
    tmdbMediaId,
    tmdbMediaType,
  }: {
    tmdbMediaId: string;
    tmdbMediaType: TmdbMediaType;
  }) => ["current-user", "reviews", tmdbMediaId, tmdbMediaType],

  usersReviews: ({ username }: { username: string }) => [
    "user",
    username,
    "reviews",
  ],
};

/* 

*/
export type GetReviewStatisticsParams = {
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
};

export const getReviewStatistics = async (
  params: GetReviewStatisticsParams
) => {
  const { data } = await BackendAPI.get<ReviewStatistics>(
    "/api/reviews/statistics",
    {
      params,
    }
  );
  return data;
};

/*


*/

export type GetReviewsParams = {
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
};

export const getReviews = async (params: GetReviewsParams) => {
  const { data } = await BackendAPI.get<ReviewAggergation[]>("/api/reviews", {
    params,
  });
  return data;
};

export const getUsersReviews = async ({ username }: { username: string }) => {
  const { data } = await BackendAPI.get<ReviewAggergation[]>(
    `/api/users/${username}/reviews`
  );
  return data;
};
