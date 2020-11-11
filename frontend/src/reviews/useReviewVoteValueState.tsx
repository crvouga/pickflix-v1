import { QueryKey, useQueryCache } from "react-query";
import {
  deleteReviewVote,
  GetReviewsData,
  postReviewVote,
  ReviewAggergation,
  ReviewVoteValue,
} from "./query";

export default (queryKey: QueryKey) => {
  const queryCache = useQueryCache();
  const previous = queryCache.getQueryData<GetReviewsData>(queryKey);

  const updateVoteValue = (
    review: ReviewAggergation,
    voteValue: ReviewVoteValue | null
  ) => {
    if (!previous) {
      return previous;
    }

    const index = previous.findIndex((_) => _.review.id === review.review.id);

    if (!index) {
      return previous;
    }

    const optimisticReview = {
      ...previous[index],
      reviewVoteCount: previous[index].reviewVoteCount + 1,
      reviewVoteValue: voteValue,
    };

    return [
      ...previous.slice(0, index),
      optimisticReview,
      ...previous.slice(index + 1),
    ];
  };

  const toggleVoteValue = async (
    review: ReviewAggergation,
    voteValue: ReviewVoteValue
  ) => {
    try {
      if (review.reviewVoteValue === voteValue) {
        queryCache.setQueryData(queryKey, updateVoteValue(review, null));
        await deleteReviewVote({ reviewId: review.review.id });
      } else {
        queryCache.setQueryData(queryKey, updateVoteValue(review, voteValue));
        await postReviewVote({
          reviewId: review.review.id,
          voteValue: voteValue,
        });
      }
    } catch (error) {
      queryCache.setQueryData(queryKey, previous);
    } finally {
      // queryCache.invalidateQueries(queryKey);
    }
  };

  const voteUp = async (review: ReviewAggergation) => {
    toggleVoteValue(review, ReviewVoteValue.UP);
  };

  const voteDown = async (review: ReviewAggergation) => {
    toggleVoteValue(review, ReviewVoteValue.DOWN);
  };

  return {
    voteUp,
    voteDown,
  };
};
