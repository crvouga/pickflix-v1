import { Box, Typography } from "@material-ui/core";
import React from "react";
import useModal from "../../app/modals/useModal";
import { MediaId } from "../../media/tmdb/types";
import ReviewCard from "../../review/card/ReviewCard";
import ReviewCardCallToAction from "../../review/card/ReviewCardCallToAction";
import ReviewCardSkeleton from "../../review/card/ReviewCardSkeleton";
import useReviewActions from "../../review/card/useReviewActions";
import { useQueryReviews } from "../../review/query";
import WithAuthentication from "../../user/auth/WithAuthentication";
import { UserAggergation } from "../../user/query";
import useReviewForm from "../../review/form/review-form/useReviewForm";
import { useListener } from "../../common/utility";

const YourReview = ({
  user,
  mediaId,
}: {
  user: UserAggergation;
  mediaId: MediaId;
}) => {
  const reviewForm = useReviewForm();
  const reviewActions = useReviewActions();
  const query = useQueryReviews({
    authorId: user.user.id,
    mediaId,
  });
  useListener(reviewForm.eventEmitter, "submitSuccess", () => {
    query.refetch();
  });

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <ReviewCardSkeleton showAuthor iconButtonCount={1} />;
  }

  const reviews = query.data.flatMap((page) => page.results);

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
  const { open } = useModal("SignInCallToAction");

  return (
    <Box paddingX={2}>
      <Box paddingBottom={1}>
        <Typography variant="h6">Your Review</Typography>
      </Box>
      <WithAuthentication
        renderAuthenticated={(currentUser) => (
          <YourReview mediaId={mediaId} user={currentUser} />
        )}
        renderDefault={() => (
          <ReviewCardCallToAction
            title="Write a review"
            subtitle="Help people decide if they should watch this movie"
            onClick={open}
          />
        )}
      />
    </Box>
  );
};
