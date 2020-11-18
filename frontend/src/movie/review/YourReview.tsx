import { Box, Typography } from "@material-ui/core";
import React from "react";
import SignInButton from "../../auth/SignInButton";
import useModal from "../../navigation/modals/useModal";
import useReviewForm from "../../reviews/form/useReviewForm";
import { useQueryReviews } from "../../reviews/query";
import ReviewCard from "../../reviews/card/ReviewCard";
import ReviewCardCallToAction from "../../reviews/card/ReviewCardCallToAction";
import ReviewCardSkeleton from "../../reviews/card/ReviewCardSkeleton";
import { MediaId } from "../../tmdb/types";
import { UserAggergation } from "../../users/query";
import { useQueryCurrentUser } from "../../users/query/hooks";
import useReviewActions from "../../reviews/card/useReviewActions";
import SignInCallToAction from "../../auth/SignInCallToAction";

const YourReview = ({
  user,
  mediaId,
}: {
  user: UserAggergation;
  mediaId: MediaId;
}) => {
  const reviewActions = useReviewActions();
  const query = useQueryReviews({
    authorId: user.user.id,
    mediaId,
  });

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <ReviewCardSkeleton showAuthor iconButtonCount={1} />;
  }

  const reviews = query.data.results;

  if (reviews.length === 0) {
    return (
      <ReviewCardCallToAction
        title="Write a review"
        subtitle="Help people decide if they should watch this movie"
        onClick={() => {
          reviewActions.onEdit({
            mediaId,
          });
        }}
      />
    );
  }

  const review = reviews[0];

  return (
    <ReviewCard
      showAuthor
      review={review}
      onEdit={() => {
        reviewActions.onEdit(review.review);
      }}
      onDelete={() => {
        reviewActions.onDelete(review.review.id);
      }}
    />
  );
};

export default ({ mediaId }: { mediaId: MediaId }) => {
  const query = useQueryCurrentUser();

  if (query.error || !query.data) {
    return (
      <Box paddingX={2}>
        <Box paddingBottom={1}>
          <Typography variant="h6">Your Review</Typography>
        </Box>
        <SignInCallToAction subtitle="Signing in allows you to write reviews!" />
      </Box>
    );
  }

  return (
    <Box paddingX={2}>
      <Box paddingBottom={1}>
        <Typography variant="h6">Your Review</Typography>
      </Box>
      <YourReview mediaId={mediaId} user={query.data} />
    </Box>
  );
};
