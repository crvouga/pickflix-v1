import {
  AppBar,
  Box,
  Button,
  Hidden,
  TextField,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React, { useState } from "react";
import ErrorBox from "../common/components/ErrorBox";
import ListItemSkeleton from "../common/components/ListItemSkeleton";
import MovieListItem from "../movie/components/MovieListItem";
import { useQueryMovie } from "../movie/query";
import { TmdbMedia, TmdbMediaType } from "../tmdb/types";
import { PostReviewParams, MAX_RATING } from "./query";

type Props = {
  tmdbMedia: {
    tmdbMediaId: string;
    tmdbMediaType: TmdbMediaType;
  };
};

const MediaInfo = ({ tmdbMedia }: { tmdbMedia: TmdbMedia }) => {
  const queryMovie = useQueryMovie(tmdbMedia);

  if (queryMovie.error) {
    return <ErrorBox />;
  }

  if (!queryMovie.data) {
    return <ListItemSkeleton />;
  }
  const movie = queryMovie.data;

  return <MovieListItem movie={movie} />;
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

  const handleSubmit = () => {
    if (rating && content.length > 0) {
      onSubmit({
        ...tmdbMedia,
        title,
        rating,
        content,
      });
    }
  };

  const disabled =
    title.length === 0 || content.length === 0 || rating === null;

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

        <Box paddingBottom={1}>
          <Rating
            size="large"
            value={rating}
            max={MAX_RATING}
            onChangeActive={(e, newValue) => {
              if (newValue > 0) {
                setRating(Math.min(Math.max(0, newValue), 5));
              }
            }}
            // onChange={(e, newValue) => {
            //   console.log({ onChange: newValue });
            //   setRating(newValue);
            // }}
          />
        </Box>

        <Box paddingBottom={1}>
          <TextField
            variant="outlined"
            style={{ fontWeight: "bold", fontSize: "1.25em" }}
            fullWidth
            onChange={(e) => {
              setTitle(e.target.value || "");
            }}
            label="Title"
          />
        </Box>

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
            label="Write your review here"
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
