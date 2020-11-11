import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { useQuery } from "react-query";
import SignInButton from "../../auth/SignInButton";
import { getReviews, queryKeys } from "../../reviews/query";
import { TmdbMedia } from "../../tmdb/types";
import AvatarUser from "../../users/AvatarUser";
import { UserAggergation } from "../../users/query";
import { useQueryCurrentUser } from "../../users/useCurrentUser";
import { pluralize } from "../../utils";
import useModal from "../../navigation/modals/useModal";
import { reviewForm } from "../../reviews/redux/review-form";
import useReviewForm from "../../reviews/hooks/useReviewForm";
import ReviewCard from "../../reviews/ReviewCard";

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
  tmdbMediaType,
  tmdbMediaId,
}: { user: UserAggergation } & TmdbMedia) => {
  const reviewFormState = useReviewForm();
  const reviewFormModal = useModal("ReviewForm");
  const params = {
    authorId: user.user.id,
    tmdbMediaType,
    tmdbMediaId,
  };

  const query = useQuery(queryKeys.reviews(params), () => getReviews(params));

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return null;
  }

  const reviews = query.data;

  const handleClick = () => {
    reviewFormState.setTmdbMedia({
      tmdbMediaType,
      tmdbMediaId,
    });
    reviewFormModal.open();
  };

  if (reviews.length === 0) {
    return <AddReviewCard user={user} onClick={handleClick} />;
  }

  return <ReviewCard showUser review={reviews[0]} />;
};

export default (props: TmdbMedia) => {
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
      <YourReview {...props} user={query.data} />
    </Box>
  );
};
