import {
  Box,
  Button,
  ButtonProps,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Rating from "@material-ui/lab/Rating";
import React, { useRef, useState } from "react";
import ListItemSkeleton from "../../common/components/ListItemSkeleton";
import { useQueryCurrentUser } from "../../users/useCurrentUser";
import UserListItem from "../../users/UserListItem";
import ReviewFormMedia from "./ReviewFormMedia";
import useReviewForm from "./useReviewForm";

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

const ReviewFormContent = (props: TextFieldProps) => {
  console.log("RENDER");
  return (
    <TextField
      variant="outlined"
      fullWidth
      multiline
      rows={6}
      rowsMax={6}
      label="Review"
      {...props}
    />
  );
};

const ReviewFormSubmitButton = (props: ButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      startIcon={<SendIcon />}
      style={{ color: "white" }}
      {...props}
    >
      Send
    </Button>
  );
};

export default ({ onCancel }: { onCancel?: () => void }) => {
  const reviewForm = useReviewForm();
  const refContent = useRef<HTMLInputElement>();

  const handleSubmit = () => {
    if (reviewForm.review.mediaId) {
      reviewForm.submit({
        content: refContent.current?.value || "",
        rating: reviewForm.review.rating,
        mediaId: reviewForm.review.mediaId,
      });
    }
  };

  return (
    <Card>
      <ReviewFormMedia />

      <ReviewFormAuthor />

      <CardContent>
        <Box paddingBottom={2}>
          <ReviewFormRating />
        </Box>
        <Box>
          <ReviewFormContent
            defaultValue={reviewForm.review.content}
            inputRef={refContent}
          />
        </Box>
      </CardContent>
      <Box display="flex" flexDirection="row-reverse" p={2}>
        <Box paddingX={2}>
          <ReviewFormSubmitButton onClick={handleSubmit} />
        </Box>

        {onCancel && (
          <Box paddingX={2}>
            <Button size="large" onClick={onCancel}>
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
};
