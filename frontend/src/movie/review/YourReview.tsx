import { Box, Typography } from "@material-ui/core";
import React from "react";
import SignInButton from "../../user/auth/SignInButton";
import useModal from "../../app/modals/useModal";
import useReviewForm from "../../review/form/review-form/useReviewForm";
import { useQueryReviews } from "../../review/query";
import ReviewCard from "../../review/card/ReviewCard";
import ReviewCardCallToAction from "../../review/card/ReviewCardCallToAction";
import ReviewCardSkeleton from "../../review/card/ReviewCardSkeleton";
import { MediaId } from "../../media/tmdb/types";
import { UserAggergation } from "../../user/query";
import { useQueryCurrentUser } from "../../user/auth/hooks";
import useReviewActions from "../../review/card/useReviewActions";
import SignInCallToAction from "../../user/auth/SignInCallToAction";

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
