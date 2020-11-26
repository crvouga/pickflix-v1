import { Box, Typography } from "@material-ui/core";
import React from "react";
import ReviewCard from "../../review/card/ReviewCard";
import ReviewCardCallToAction from "../../review/card/ReviewCardCallToAction";
import ReviewCardSkeleton from "../../review/card/ReviewCardSkeleton";
import useReviewActions from "../../review/card/useReviewActions";
import useReviewVoteValue from "../../review/card/useReviewVoteValue";
import { getReviewsQueryKey, useQueryReviews } from "../../review/query";
import WithAuthentication from "../auth/WithAuthentication";
import { UserAggergation } from "../query";

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

export const ListReviewsUser = ({ user }: { user: UserAggergation }) => {
  const query = useQueryReviews({
    authorId: user.user.id,
  });

  const reviewVoteValue = useReviewVoteValue(
    getReviewsQueryKey({
      authorId: user.user.id,
    })
  );

  if (query.error) {
    return null;
  }

  if (query.data === undefined) {
    return <ListReviewsSkeleton reviewCardCount={user.reviewCount} />;
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
  currentUser,
}: {
  currentUser: UserAggergation;
}) => {
  const query = useQueryReviews({
    authorId: currentUser.user.id,
  });

  const reviewVoteValue = useReviewVoteValue(
    getReviewsQueryKey({
      authorId: currentUser.user.id,
    })
  );
  const reviewActions = useReviewActions();

  if (query.error) {
    return null;
  }

  if (query.data === undefined) {
    return <ListReviewsSkeleton reviewCardCount={currentUser.reviewCount} />;
  }

  const reviews = query.data.results;

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
  return (
    <WithAuthentication
      renderAuthenticated={(currentUser) =>
        currentUser.user.id === user.user.id ? (
          <ListReviewsCurrentUser currentUser={currentUser} />
        ) : (
          <ListReviewsUser user={user} />
        )
      }
      renderDefault={() => <ListReviewsUser user={user} />}
    />
  );
};
