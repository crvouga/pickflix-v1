import { TmdbMediaType } from "../../tmdb/types";
import backendAPI from "../../backendAPI";
import { ReviewAggergation } from "./types";

/*


*/

export type GetReviewsParams = {
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
};

export const getReviews = async (params: GetReviewsParams) => {
  const { data } = await backendAPI.get<ReviewAggergation[]>("/api/reviews", {
    params,
  });
  return data;
};
