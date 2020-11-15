import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import SignInButton from "../../auth/SignInButton";
import useModal from "../../navigation/modals/useModal";
import useReviewForm from "../../reviews/form/useReviewForm";
import { useQueryReviews } from "../../reviews/query";
import ReviewCard from "../../reviews/ReviewCard";
import { MediaId } from "../../tmdb/types";
import AvatarUser from "../../users/AvatarUser";
import { UserAggergation } from "../../users/query";
import { useQueryCurrentUser } from "../../users/useCurrentUser";
import { pluralize } from "../../utils";

const AddReviewCard = ({
  user,
  onClick,
}: {
  user: UserAggergation;
  onClick?: () => void;
}) => {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box paddingBottom={1}>
              <AvatarUser
                style={{ width: "48px", height: "48px", fontSize: "2em" }}
                user={user.user}
              />
            </Box>
            <Typography align="center" color="textSecondary">
              {`${user.user.username} · ${pluralize(
                user.reviewCount,
                "review"
              )}`}
            </Typography>
            <Typography variant="h6" align="center">
              Leave a review
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
            >
              Help people decide if they should watch this movie
            </Typography>
            <Rating disabled name="rating" size="large" max={5} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

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
    return null;
  }

  const reviews = query.data;

  if (reviews.length === 0) {
    return (
      <AddReviewCard
        user={user}
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
