import { useQuery } from "react-query";
import { BackendAPI } from "../../backend-api";
import { MediaId } from "../../tmdb/types";
import { ReviewAggergation, ReviewStatistics } from "./types";
import { Paginated } from "../../common/types";

export const queryKeys = {
  reviewStatistics: (params: GetReviewStatisticsParams) => [
    "reviews",
    "statistics",
    params,
  ],

  currentUserReview: ({ mediaId }: { mediaId: MediaId }) => [
    "current-user",
    "reviews",
    mediaId,
  ],

  usersReviews: ({ username }: { username: string }) => [
    "user",
    username,
    "reviews",
  ],
};

/* 

*/
export type GetReviewStatisticsParams = {
  mediaId: MediaId;
};

export const getReviewStatistics = async ({
  mediaId,
}: GetReviewStatisticsParams) => {
  const { data } = await BackendAPI.get<ReviewStatistics>(
    "/api/reviews/statistics",
    {
      params: {
        ...mediaId,
      },
    }
  );
  return data;
};

/*


*/

export type GetReviewsParams = {
  authorId?: string;
  mediaId?: MediaId;
  userId?: string;
};

export type GetReviewsResponseData = Paginated<ReviewAggergation>;

export const getReviews = async ({
  authorId,
  userId,
  mediaId,
}: GetReviewsParams) => {
  const { data } = await BackendAPI.get<GetReviewsResponseData>(
    "/api/reviews",
    {
      params: {
        authorId,
        userId,
        ...mediaId,
      },
    }
  );
  return data;
};

export const getReviewsQueryKey = (params: GetReviewsParams) => [
  "reviews",
  params.authorId,
  params.userId,
  params.mediaId,
];

export const useQueryReviews = (params: GetReviewsParams) => {
  return useQuery(getReviewsQueryKey(params), () => getReviews(params));
};
