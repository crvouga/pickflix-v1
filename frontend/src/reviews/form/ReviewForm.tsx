import {
  AppBar,
  Box,
  Button,
  Hidden,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import MuiRating from "@material-ui/lab/Rating";
import React from "react";
import ListItemSkeleton from "../../common/components/ListItemSkeleton";
import MovieListItem from "../../movie/components/MovieListItem";
import { useQueryMovie } from "../../tmdb/query";
import { MediaId } from "../../tmdb/types";
import { useQueryCurrentUser } from "../../users/useCurrentUser";
import UserListItem from "../../users/UserListItem";
import useReviewForm from "./useReviewForm";

const Rating = withStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
})(MuiRating);

const CurrentUserInfo = () => {
  const query = useQueryCurrentUser();

  if (query.error) return null;
  if (!query.data) return <ListItemSkeleton />;

  return (
    <UserListItem
      user={query.data.user}
      ListItemTextProps={{ secondary: "Public Post" }}
      onClick={() => {}}
    />
  );
};

const MediaInfo = ({ mediaId }: { mediaId: MediaId }) => {
  const query = useQueryMovie({ mediaId });
  if (query.error) return null;
  if (!query.data) return <ListItemSkeleton />;
  return <MovieListItem movie={query.data} onClick={() => {}} />;
};

export default () => {
  const reviewForm = useReviewForm();

  const handleSubmit = () => {
    reviewForm.submit();
  };

  const handleClose = () => {};
  return (
    <React.Fragment>
      <AppBar color="default" position="sticky">
        <Box display="flex">
          <Box p={2} flex={1}>
            <Typography variant="h6">Write a review</Typography>
          </Box>
          <Hidden smUp>
            <Button size="large" onClick={handleClose}>
              Cancel
            </Button>
          </Hidden>
        </Box>
      </AppBar>
      <Box p={2}>
        {reviewForm.mediaId && <MediaInfo mediaId={reviewForm.mediaId} />}

        <CurrentUserInfo />

        <Box paddingY={2} display="flex" justifyContent="center">
          <Rating
            name="review-form-rating"
            value={reviewForm.rating}
            size="large"
            onChangeActive={(e, value) => {
              if (value > 0) {
                reviewForm.setRating(value);
              }
            }}
            onChange={(e, value) => {
              if (value) {
                reviewForm.setRating(value);
              }
            }}
          />
        </Box>

        <Box paddingBottom={1}>
          <TextField
            variant="outlined"
            defaultValue={reviewForm.content}
            style={{ fontWeight: "bold", fontSize: "1.25em" }}
            fullWidth
            multiline
            rows={6}
            rowsMax={6}
            onChange={(e) => {
              reviewForm.setContent(e.target.value || "");
            }}
            label="Write Review Here"
          />
        </Box>

        <Box paddingBottom={1}>
          <Button
            disabled={reviewForm.disabled}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};
