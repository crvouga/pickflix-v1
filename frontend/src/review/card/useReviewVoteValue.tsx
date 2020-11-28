import { QueryKey, useQueryCache } from "react-query";
import { useSnackbar } from "../../app/snackbar/redux/snackbar";
import {
  deleteReviewVote,
  GetReviewsQueryData,
  postReviewVote,
  ReviewAggergation,
  ReviewVoteValue,
} from "../query";
import { Paginated } from "../../common/types";

const updateReviewVoteValue = (
  nextVoteValue: ReviewVoteValue | null,
  review: ReviewAggergation
) => {
  const previousVoteValue = review.reviewVoteValue;
  const updated: ReviewAggergation = {
    ...review,
    reviewVoteValue: nextVoteValue,
  };

  if (previousVoteValue === null && nextVoteValue !== null) {
    updated.reviewVoteCount += 1;
  }

  if (previousVoteValue !== null && nextVoteValue === null) {
    updated.reviewVoteCount -= 1;
  }

  if (
    previousVoteValue !== ReviewVoteValue.UP &&
    nextVoteValue === ReviewVoteValue.UP
  ) {
    updated.reviewUpVoteCount += 1;
  }

  if (
    previousVoteValue === ReviewVoteValue.UP &&
    nextVoteValue !== ReviewVoteValue.UP
  ) {
    updated.reviewUpVoteCount -= 1;
  }

  return updated;
};

const updatePage = (
  reviewId: string,
  nextVoteValue: ReviewVoteValue | null,
  page: Paginated<ReviewAggergation>
): Paginated<ReviewAggergation> => {
  if (!page) {
    return page;
  }
  const index = page.results.findIndex((_) => _.review.id === reviewId);

  if (index === -1) {
    return page;
  }

  return {
    ...page,
    results: [
      ...page.results.slice(0, index),
      updateReviewVoteValue(nextVoteValue, page.results[index]),
      ...page.results.slice(index + 1),
    ],
  };
};

const optimisticUpdate = (
  reviewId: string,
  nextVoteValue: ReviewVoteValue | null,
  previous: GetReviewsQueryData
): GetReviewsQueryData => {
  if (!previous) {
    return previous;
  }
  const index = previous.findIndex((page) =>
    page.results.find((review) => review.review.id === reviewId)
  );

  if (index === -1) {
    return previous;
  }

  return [
    ...previous.slice(0, index),
    updatePage(reviewId, nextVoteValue, previous[index]),
    ...previous.slice(index + 1),
  ];
};

export default (queryKey: QueryKey) => {
  const queryCache = useQueryCache();

  const previous = queryCache.getQueryData<GetReviewsQueryData>(queryKey);

  const toggleVoteValue = async (
    review: ReviewAggergation,
    voteValue: ReviewVoteValue
  ) => {
    if (previous) {
      queryCache.setQueryData(
        queryKey,
        optimisticUpdate(
          review.review.id,
          review.reviewVoteValue === voteValue ? null : voteValue,
          previous
        )
      );
    }

    try {
      if (review.reviewVoteValue === voteValue) {
        await deleteReviewVote({ reviewId: review.review.id });
      } else {
        await postReviewVote({
          reviewId: review.review.id,
          voteValue: voteValue,
        });
      }
    } catch (error) {
      queryCache.setQueryData(queryKey, previous);
    } finally {
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
