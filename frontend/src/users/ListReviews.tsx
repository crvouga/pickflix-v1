import { Box, Typography } from "@material-ui/core";
import React from "react";
import ErrorBox from "../common/components/ErrorBox";
import useModal from "../navigation/modals/useModal";
import useReviewForm from "../reviews/form/useReviewForm";
import {
  getReviewsQueryKey,
  ReviewAggergation,
  useQueryReviews,
} from "../reviews/query";
import ReviewCard from "../reviews/ReviewCard";
import ReviewCardCallToAction from "../reviews/ReviewCardCallToAction";
import ReviewCardSkeleton from "../reviews/ReviewCardSkeleton";
import useReviewVoteValueState from "../reviews/useReviewVoteValueState";
import { UserAggergation } from "./query";
import { useQueryCurrentUser } from "./useCurrentUser";

const ListReviewsSkeleton = ({
  reviewCardCount,
}: {
  reviewCardCount: number;
}) => {
  return (
    <React.Fragment>
      {[...Array(Math.min(20, reviewCardCount))].map((n) => (
        <Box key={n} paddingY={1}>
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
  const reviewVoteState = useReviewVoteValueState(
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
              reviewVoteState.voteDown(review);
            }}
            onVoteUp={() => {
              reviewVoteState.voteUp(review);
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
  const reviewForm = useReviewForm();
  const reviewFormModal = useModal("ReviewForm");

  if (reviews.length === 0) {
    return (
      <ReviewCardCallToAction
        user={currentUser}
        title="Write a review"
        subtitle=""
        onClick={() => {
          reviewFormModal.open();
        }}
      />
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
              reviewForm.setReview(review.review);
              reviewFormModal.open();
            }}
            onDelete={() => {
              console.log("DELETE");
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
