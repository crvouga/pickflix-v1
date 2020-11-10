import { QueryCache } from "react-query";
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
    queryCache.invalidateQueries((query) => query.queryKey.includes("reviews"));
  }
};

/* 


*/
