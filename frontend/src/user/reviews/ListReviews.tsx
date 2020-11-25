import { Box, Typography } from "@material-ui/core";
import React from "react";
import ErrorBox from "../../common/components/ErrorBox";
import ReviewCard from "../../review/card/ReviewCard";
import ReviewCardCallToAction from "../../review/card/ReviewCardCallToAction";
import ReviewCardSkeleton from "../../review/card/ReviewCardSkeleton";
import useReviewActions from "../../review/card/useReviewActions";
import useReviewVoteValue from "../../review/card/useReviewVoteValue";
import {
  getReviewsQueryKey,
  ReviewAggergation,
  useQueryReviews,
} from "../../review/query";
import { useQueryCurrentUser, UserAggergation } from "../query";

const ListReviewsSkeleton = ({
  reviewCardCount,
}: {
  reviewCardCount: number;
}) => {
  return (
    <React.Fragment>
      {[...Array(Math.min(20, reviewCardCount))].map((_, index) => (
        <Box key={index} paddingY={1}>
          <ReviewCardSkeleton showMedia iconButtonCount={1} />
        </Box>
      ))}
    </React.Fragment>
  );
};

export const ListReviews = ({
  reviews,
  user,
}: {
  reviews: ReviewAggergation[];
  user: UserAggergation;
}) => {
  const reviewVoteValue = useReviewVoteValue(
    getReviewsQueryKey({
      authorId: user.user.id,
    })
  );

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
    <React.Fragment>
      {reviews.map((review) => (
        <Box key={review.review.id} paddingY={1}>
          <ReviewCard
            showMedia
            review={review}
            onVoteDown={() => {
              reviewVoteValue.voteDown(review);
            }}
            onVoteUp={() => {
              reviewVoteValue.voteUp(review);
            }}
          />
        </Box>
      ))}
    </React.Fragment>
  );
};

export const ListReviewsCurrentUser = ({
  reviews,
  currentUser,
}: {
  reviews: ReviewAggergation[];
  currentUser: UserAggergation;
}) => {
  const reviewVoteValue = useReviewVoteValue(
    getReviewsQueryKey({
      authorId: currentUser.user.id,
    })
  );
  const reviewActions = useReviewActions();

  if (reviews.length === 0) {
    return (
      <Box paddingY={1}>
        <ReviewCardCallToAction
          title="Write a review"
          subtitle=""
          onClick={() => {
            reviewActions.onEdit({});
          }}
        />
      </Box>
    );
  }

  return (
    <React.Fragment>
      {reviews.map((review) => (
        <Box key={review.review.id} paddingY={1}>
          <ReviewCard
            showMedia
            review={review}
            onEdit={() => {
              reviewActions.onEdit(review.review);
            }}
            onDelete={() => {
              reviewActions.onDelete(review.review.id);
            }}
            onVoteDown={() => {
              reviewVoteValue.voteDown(review);
            }}
            onVoteUp={() => {
              reviewVoteValue.voteUp(review);
            }}
          />
        </Box>
      ))}
    </React.Fragment>
  );
};

export default ({ user }: { user: UserAggergation }) => {
  const queryCurrentUser = useQueryCurrentUser();
  const query = useQueryReviews({
    authorId: user.user.id,
  });

  if (query.error || queryCurrentUser.error) {
    return <ErrorBox />;
  }

  if (query.data === undefined || queryCurrentUser.data === undefined) {
    return <ListReviewsSkeleton reviewCardCount={user.reviewCount} />;
  }

  const currentUser = queryCurrentUser.data;
  const reviews = query.data.results;

  if (currentUser !== null && currentUser.user.id === user.user.id) {
    return (
      <ListReviewsCurrentUser reviews={reviews} currentUser={currentUser} />
    );
  }

  return <ListReviews reviews={reviews} user={user} />;
};
