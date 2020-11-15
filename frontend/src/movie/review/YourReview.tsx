import { Box, Typography } from "@material-ui/core";
import React from "react";
import SignInButton from "../../auth/SignInButton";
import useModal from "../../navigation/modals/useModal";
import useReviewForm from "../../reviews/form/useReviewForm";
import { useQueryReviews } from "../../reviews/query";
import ReviewCard from "../../reviews/ReviewCard";
import ReviewCardCallToAction from "../../reviews/ReviewCardCallToAction";
import ReviewCardSkeleton from "../../reviews/ReviewCardSkeleton";
import { MediaId } from "../../tmdb/types";
import { UserAggergation } from "../../users/query";
import { useQueryCurrentUser } from "../../users/useCurrentUser";

const YourReview = ({
  user,
  mediaId,
}: {
  user: UserAggergation;
  mediaId: MediaId;
}) => {
  const reviewForm = useReviewForm();
  const reviewFormModal = useModal("ReviewForm");
  const query = useQueryReviews({
    authorId: user.user.id,
    mediaId,
  });

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <ReviewCardSkeleton showUser iconButtonCount={1} />;
  }

  const reviews = query.data.results;

  if (reviews.length === 0) {
    return (
      <ReviewCardCallToAction
        user={user}
        title="Leave a review"
        subtitle="Help people decide if they should watch this movie"
        onClick={() => {
          reviewForm.setReview({
            mediaId,
          });
          reviewFormModal.open();
        }}
      />
    );
  }

  const review = reviews[0];

  return (
    <ReviewCard
      showUser
      review={review}
      onEdit={() => {
        reviewForm.setReview(review.review);
        reviewFormModal.open();
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
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography align="center">You are not signed in.</Typography>
          <Box paddingBottom={1}>
            <Typography align="center">
              If you sign in you can leave a review!
            </Typography>
          </Box>
          <SignInButton />
        </Box>
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
