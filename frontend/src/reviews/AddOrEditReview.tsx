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
import React, { useState } from "react";
import ListItemSkeleton from "../common/components/ListItemSkeleton";
import MovieListItem from "../movie/components/MovieListItem";
import { useQueryMovie } from "../movie/query";
import { TmdbMedia } from "../tmdb/types";
import { useQueryCurrentUser } from "../users/useCurrentUser";
import UserListItem from "../users/UserListItem";
import { PostReviewParams } from "./query";

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
      user={query.data}
      ListItemTextProps={{ secondary: "Public Post" }}
      onClick={() => {}}
    />
  );
};

const MediaInfo = ({ tmdbMedia }: { tmdbMedia: TmdbMedia }) => {
  const query = useQueryMovie(tmdbMedia);
  if (query.error) return null;
  if (!query.data) return <ListItemSkeleton />;
  return <MovieListItem movie={query.data} onClick={() => {}} />;
};

export default ({
  tmdbMedia,
  onCancel,
  onSubmit,
}: {
  tmdbMedia: TmdbMedia;
  onCancel: () => void;
  onSubmit: (_: PostReviewParams) => void;
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const disabled = rating === null || !(1 <= rating && rating <= 5);

  const handleSubmit = () => {
    if (rating) {
      onSubmit({
        ...tmdbMedia,
        rating,
        title,
        content,
      });
    }
  };

  return (
    <React.Fragment>
      <AppBar color="default" position="sticky">
        <Box display="flex">
          <Box p={2} flex={1}>
            <Typography variant="h6">Write a review</Typography>
          </Box>
          <Hidden smUp>
            <Button size="large" onClick={onCancel}>
              Cancel
            </Button>
          </Hidden>
        </Box>
      </AppBar>
      <Box p={2}>
        <MediaInfo tmdbMedia={tmdbMedia} />

        <CurrentUserInfo />

        <Box paddingY={2} display="flex" justifyContent="center">
          <Rating name="size-large" defaultValue={2} size="large" />
        </Box>

        {/* <Box paddingBottom={1}>
          <TextField
            variant="outlined"
            style={{ fontWeight: "bold", fontSize: "1.25em" }}
            fullWidth
            onChange={(e) => {
              setTitle(e.target.value || "");
            }}
            label="Title"
          />
        </Box> */}

        <Box>
          <TextField
            variant="outlined"
            style={{ fontWeight: "bold", fontSize: "1.25em" }}
            fullWidth
            multiline
            rows={6}
            rowsMax={6}
            onChange={(e) => {
              setContent(e.target.value || "");
            }}
            label="Write Review Here"
          />
        </Box>

        <Box display="flex" flexDirection="row-reverse" p={2}>
          <Box>
            <Button
              disabled={disabled}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
          <Box marginRight={2}>
            <Button onClick={onCancel}>Cancel</Button>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};
