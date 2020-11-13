import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Toolbar,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React, { useState } from "react";
import ListItemSkeleton from "../../common/components/ListItemSkeleton";
import MovieListItem from "../../movie/components/MovieListItem";
import { useQueryMovie } from "../../tmdb/query";
import { MediaId } from "../../tmdb/types";
import { useQueryCurrentUser } from "../../users/useCurrentUser";
import UserListItem from "../../users/UserListItem";
import useReviewForm from "./useReviewForm";
import SendIcon from "@material-ui/icons/Send";
import CancelIcon from "@material-ui/icons/Cancel";
import { Autocomplete } from "@material-ui/lab";
import ReviewFormMedia from "./ReviewFormMedia";
const ReviewFormAuthor = () => {
  const query = useQueryCurrentUser();

  if (query.error) return null;
  if (!query.data) return <ListItemSkeleton />;

  return (
    <UserListItem
      user={query.data.user}
      ListItemTextProps={{ secondary: "Public Post" }}
      disabled
    />
  );
};

const ReviewFormRating = () => {
  const reviewForm = useReviewForm();
  const [rating, setRating] = useState(0);
  return (
    <Rating
      name="review-form-rating"
      value={reviewForm.review.rating || 0}
      size="large"
      onChangeActive={(e, value) => {
        if (value > 0) {
          setRating(value);
        }
      }}
      onClick={() => {
        reviewForm.setReview({
          ...reviewForm.review,
          rating,
        });
      }}
      onChange={(e, value) => {
        //not working for some reason
      }}
    />
  );
};

const ReviewFormContent = () => {
  const reviewForm = useReviewForm();

  return (
    <TextField
      variant="outlined"
      defaultValue={reviewForm.review.content}
      fullWidth
      multiline
      rows={6}
      rowsMax={6}
      onChange={(event) => {
        const content = event.target.value || "";

        reviewForm.setReview({
          ...reviewForm.review,
          content,
        });
      }}
      label="Review"
    />
  );
};

const ReviewFormSubmitButton = () => {
  const reviewForm = useReviewForm();

  const handleSubmit = () => {
    reviewForm.submit();
  };
  return (
    <Toolbar>
      <Button
        disabled={reviewForm.disabled}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        startIcon={<SendIcon />}
        style={{ color: "white" }}
      >
        Send
      </Button>
    </Toolbar>
  );
};

export default ({ onCancel }: { onCancel?: () => void }) => {
  const reviewForm = useReviewForm();

  return (
    <Card>
      <CardHeader titleTypographyProps={{ variant: "h6" }} title="Review" />

      <ReviewFormMedia />

      <ReviewFormAuthor />

      <CardContent>
        <Box paddingBottom={2}>
          <ReviewFormRating />
        </Box>
        <Box>
          <ReviewFormContent />
        </Box>
      </CardContent>
      <CardActions>
        {onCancel && (
          <Button size="large" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <ReviewFormSubmitButton />
      </CardActions>
    </Card>
  );
};
