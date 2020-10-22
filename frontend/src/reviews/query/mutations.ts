import { QueryCache } from "react-query";
import { queryKeys } from "./query-keys";
import { postReview, PostReviewParams } from "./writes";

/* 


*/

export const addReviewMutation = (queryCache: QueryCache) => async (
  params: PostReviewParams
) => {
  try {
    const review = await postReview(params);
    return review;
  } catch (error) {
    throw error;
  } finally {
    queryCache.invalidateQueries(queryKeys.reviews(params));
  }
};

/* 


*/
