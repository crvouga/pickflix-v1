import {
  AppBar,
  Box,
  Button,
  Hidden,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import ErrorBox from "../common/components/ErrorBox";
import LoadingBox from "../common/components/LoadingBox";
import MoviePosterCard from "../movie/components/MoviePosterCard";
import { useQueryMovie } from "../movie/query";
import * as movieUtils from "../movie/utils";
import { TmdbMedia, TmdbMediaType } from "../tmdb/types";
import { Rating } from "@material-ui/lab";

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
    return <LoadingBox m={6} />;
  }

  const movie = queryMovie.data;
  const subtitle = [
    movieUtils.releaseYear(movie),
    movieUtils.toCertification(movie),
    // movieUtils.runtime(movie),
  ]
    .filter((_) => _)
    .join(` ${movieUtils.SMALL_DOT} `);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="120px" paddingBottom={1}>
        <MoviePosterCard noLink movie={movie} />
      </Box>
      <Box>
        <Typography variant="h5" align="center">
          {movie.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default ({
  tmdbMedia,
  onCancel,
  onSubmit,
}: {
  tmdbMedia: TmdbMedia;
  onCancel: () => void;
  onSubmit: (_: { rating: number; content: string }) => void;
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (rating && content.length > 0) {
      onSubmit({
        rating,
        content,
      });
    }
  };

  const disabled = content.length === 0;

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
        <Box paddingBottom={2}>
          <MediaInfo tmdbMedia={tmdbMedia} />
        </Box>

        <Box paddingBottom={1}>
          <Rating
            size="large"
            value={rating}
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
