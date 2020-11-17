import {
  Box,
  Button,
  ButtonProps,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import Rating from "@material-ui/lab/Rating";
import React, { useEffect, useRef, useState } from "react";
import ListItemSkeleton from "../../common/components/ListItemSkeleton";
import useBoolean from "../../common/hooks/useBoolean";
import useSnackbar from "../../snackbar/useSnackbar";
import { useQueryCurrentUser } from "../../users/useCurrentUser";
import UserListItem from "../../users/UserListItem";
import { useListener } from "../../utils";
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
    <Button variant="text" size="large" startIcon={<CloseIcon />} {...props}>
      Cancel
    </Button>
  );
};

const LoadingDialog = () => {
  const reviewForm = useReviewForm();
  const isLoading = useBoolean(false);

  useListener(reviewForm.eventEmitter, "submit", isLoading.setTrue);
  useListener(reviewForm.eventEmitter, "submitSettled", isLoading.setFalse);

  return (
    <Dialog open={isLoading.value}>
      <List>
        <ListItem>
          <ListItemIcon>
            <CircularProgress disableShrink />
          </ListItemIcon>
          <ListItemText primary="Posting" />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default ({ onCancel }: { onCancel?: () => void }) => {
  const reviewForm = useReviewForm();
  const snackbar = useSnackbar();
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

  useEffect(() => {
    if (refContent.current) {
      refContent.current.value = reviewForm.review.content || "";
    }
  }, [reviewForm.review.content, refContent.current]);

  useListener(reviewForm.eventEmitter, "submitSuccess", () => {
    snackbar.display({
      message: "Review posted",
    });
  });

  const disabled =
    !Boolean(reviewForm.review.mediaId) || !Boolean(reviewForm.review.rating);

  return (
    <React.Fragment>
      <LoadingDialog />
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
              defaultValue={reviewForm.review.content || ""}
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
