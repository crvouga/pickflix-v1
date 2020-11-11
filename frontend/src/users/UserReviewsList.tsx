import { Box, Typography } from "@material-ui/core";
import React from "react";
import LoadingBox from "../common/components/LoadingBox";
import { useQueryReviews, getReviewsQueryKey } from "../reviews/query";
import ReviewCard from "../reviews/ReviewCard";
import { User } from "./query";
import useReviewVoteValueState from "../reviews/useReviewVoteValueState";

export default ({ user }: { user: User }) => {
  const query = useQueryReviews({
    authorId: user.id,
  });

  const reviewVoteState = useReviewVoteValueState(
    getReviewsQueryKey({
      authorId: user.id,
    })
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return null;
  }

  const reviews = query.data;

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
        <Box key={review.review.id} paddingY={1} paddingBottom={2}>
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
