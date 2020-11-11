import { BackendAPI } from "../../backend-api";
import { TmdbMediaType } from "../../tmdb/types";
import { ReviewAggergation, ReviewStatistics } from "./types";
import { useQuery } from "react-query";

export const queryKeys = {
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
  authorId?: string;
  tmdbMediaId?: string;
  tmdbMediaType?: TmdbMediaType;
  userId?: string;
};

export type GetReviewsData = ReviewAggergation[];

export const getReviews = async (params: GetReviewsParams) => {
  const { data } = await BackendAPI.get<GetReviewsData>("/api/reviews", {
    params,
  });
  return data;
};

export const getReviewsQueryKey = (params: GetReviewsParams) => [
  "reviews",
  params.authorId,
  params.tmdbMediaId,
  params.tmdbMediaType,
  params.userId,
];

export const useQueryReviews = (params: GetReviewsParams) => {
  return useQuery(getReviewsQueryKey(params), () => getReviews(params));
};
