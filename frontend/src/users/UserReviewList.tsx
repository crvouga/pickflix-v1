import { Box, Typography } from "@material-ui/core";
import { range } from "ramda";
import React from "react";
import { getReviewsQueryKey, useQueryReviews } from "../reviews/query";
import ReviewCard, { ReviewCardSkeleton } from "../reviews/ReviewCard";
import useReviewVoteValueState from "../reviews/useReviewVoteValueState";
import { UserAggergation } from "./query";

export default ({ user }: { user: UserAggergation }) => {
  const query = useQueryReviews({
    authorId: user.user.id,
  });

  const reviewVoteState = useReviewVoteValueState(
    getReviewsQueryKey({
      authorId: user.user.id,
    })
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return (
      <React.Fragment>
        {[...Array(Math.min(20, user.reviewCount))].map((n) => (
          <Box key={n} paddingY={1}>
            <ReviewCardSkeleton showMedia iconButtonCount={2} />
          </Box>
        ))}
      </React.Fragment>
    );
  }

  const reviews = query.data.results;

  if (reviews.length === 0) {
    return (
      <Box m={6}>
        <Typography color="textSecondary" align="center">
          No reviews
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {reviews.map((review) => (
        <Box key={review.review.id} paddingY={1}>
          <ReviewCard
            showMedia
            review={review}
            onVoteDown={() => {
              reviewVoteState.voteDown(review);
            }}
            onVoteUp={() => {
              reviewVoteState.voteUp(review);
            }}
          />
        </Box>
      ))}
    </Box>
  );
};
