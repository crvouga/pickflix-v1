import { useQuery } from "react-query";
import { BackendAPI } from "../../backend-api";
import useInfiniteQueryPagination from "../../common/hooks/useInfiniteQueryPagination";
import { Paginated } from "../../common/types";
import { MediaId } from "../../media/tmdb/types";
import { ReviewAggergation, ReviewStatistics } from "./types";

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

export const makeGetReviewStatisticsQueryKey = (
  params: GetReviewStatisticsParams
) => {
  return ["review-statistics", params];
};

export const useQueryReviewStatistics = (params: GetReviewStatisticsParams) => {
  return useQuery(makeGetReviewStatisticsQueryKey(params), () =>
    getReviewStatistics(params)
  );
};

/*


*/

export type GetReviewsParams = {
  id?: string;
  authorId?: string;
  mediaId?: MediaId;
  userId?: string;
  page?: number;
};

export const getReviews = async ({
  authorId,
  userId,
  mediaId,
  page,
}: GetReviewsParams) => {
  const { data } = await BackendAPI.get<Paginated<ReviewAggergation>>(
    "/api/reviews",
    {
      params: {
        authorId,
        userId,
        ...mediaId,
        page,
      },
    }
  );
  return data;
};

export const makeGetReviewsQueryKey = (params: GetReviewsParams) => [
  "reviews",
  params.authorId,
  params.userId,
  params.mediaId,
];

export type GetReviewsQueryData = Paginated<ReviewAggergation>[];
export const useQueryReviews = (params: GetReviewsParams) => {
  return useInfiniteQueryPagination(
    makeGetReviewsQueryKey(params),
    ({ lastPage }) => getReviews({ ...params, page: lastPage })
  );
};
