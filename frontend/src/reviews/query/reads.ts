import { TmdbMediaType } from "../../tmdb/types";
import { BackendAPI } from "../../backend-api";
import { ReviewAggergation } from "./types";

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
