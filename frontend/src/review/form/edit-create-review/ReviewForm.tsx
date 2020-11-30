import {
  Box,
  Button,
  ButtonProps,
  Card,
  CardContent,
  Hidden,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Rating from "@material-ui/lab/Rating";
import React, { useEffect, useRef, useState } from "react";
import { useSnackbar } from "../../../app/snackbar/redux/snackbar";
import ListItemSkeleton from "../../../common/components/ListItemSkeleton";
import LoadingDialog from "../../../common/components/LoadingDialog";
import useBoolean from "../../../common/hooks/useBoolean";
import { useListener } from "../../../common/utility";
import UserListItem from "../../../user/components/UserListItem";
import { useQueryCurrentUser } from "../../../user/query";
import {
  eventEmitterReviewForm,
  submitReview,
  useReviewFormState,
} from "./review-form";
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
  const { review, setReview } = useReviewFormState();
  const [rating, setRating] = useState(0);
  return (
    <Rating
      name="review-form-rating"
      value={review.rating || 0}
      size="large"
      onChangeActive={(e, value) => {
        if (value > 0) {
          setRating(value);
        }
      }}
      onClick={() => {
        setReview({
          ...review,
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
    <Box
      color={props.disabled ? "action.disabled" : "text.primary"}
      fontWeight="bold"
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<ArrowUpwardIcon />}
        style={{ color: "inherit", fontWeight: "inherit" }}
        {...props}
      >
        Post
      </Button>
    </Box>
  );
};

const ReviewCancelButton = (props: ButtonProps) => {
  return (
    <Button
      variant="text"
      size="large"
      // startIcon={<CloseIcon />}
      {...props}
    >
      Cancel
    </Button>
  );
};

const Posting = () => {
  const isLoading = useBoolean(false);
  useListener(eventEmitterReviewForm, "submit", isLoading.setTrue);
  useListener(eventEmitterReviewForm, "submitSettled", isLoading.setFalse);
  return (
    <LoadingDialog
      open={isLoading.value}
      ListItemTextProps={{ primary: "Posting" }}
    />
  );
};

export default ({ onCancel }: { onCancel?: () => void }) => {
  const reviewFormState = useReviewFormState();
  const snackbar = useSnackbar();
  const refContent = useRef<HTMLInputElement>();

  const handleSubmit = () => {
    const { mediaId, rating } = reviewFormState.review;

    if (mediaId && rating) {
      submitReview({
        content: refContent.current?.value || "",
        rating,
        mediaId,
      });
    }
  };

  useEffect(() => {
    if (refContent.current) {
      refContent.current.value = reviewFormState.review.content || "";
    }
  }, [reviewFormState.review.content, refContent.current]);

  useListener(eventEmitterReviewForm, "submitSuccess", () => {
    snackbar.display({
      message: "Review posted",
    });
  });

  const disabled =
    !Boolean(reviewFormState.review.mediaId) ||
    !Boolean(reviewFormState.review.rating);

  return (
    <React.Fragment>
      <Posting />
      <Card>
        <Hidden smUp>
          <Box display="flex" p={2}>
            {onCancel && <ReviewCancelButton onClick={onCancel} />}
            <Box flex={1}></Box>
            <ReviewFormSubmitButton
              disabled={disabled}
              onClick={handleSubmit}
            />
          </Box>
        </Hidden>

        <ReviewFormMedia />

        <ReviewFormAuthor />

        <CardContent>
          <Box paddingBottom={2}>
            <ReviewFormRating />
          </Box>
          <Box>
            <ReviewFormContent
              defaultValue={reviewFormState.review.content || ""}
              inputRef={refContent}
            />
          </Box>
        </CardContent>

        <Hidden xsDown>
          <Box display="flex" flexDirection="row-reverse" p={2}>
            <Box marginRight={2}>
              <ReviewFormSubmitButton
                disabled={disabled}
                onClick={handleSubmit}
              />
            </Box>

            {onCancel && (
              <Box marginRight={2}>
                <ReviewCancelButton onClick={onCancel} />
              </Box>
            )}
          </Box>
        </Hidden>
      </Card>
    </React.Fragment>
  );
};
