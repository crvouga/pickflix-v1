import { Box, CircularProgress, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import { useDebounce } from "use-debounce/lib";
import ListItemSkeleton from "../../../common/components/ListItemSkeleton";
import MovieListItem from "../../../movie/components/MovieListItem";
import { useQueryMovie, useQueryMovieSearch } from "../../../tmdb/query";
import { MediaId, TmdbMediaType } from "../../../tmdb/types";
import useReviewForm from "./useReviewForm";

const Media = ({ mediaId }: { mediaId: MediaId }) => {
  const query = useQueryMovie({
    mediaId,
  });

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <ListItemSkeleton />;
  }

  return <MovieListItem movie={query.data} />;
};

const MediaSearch = () => {
  const reviewForm = useReviewForm();
  const [text, setText] = useState("");
  const [debouncedText] = useDebounce(text, 200);

  const query = useQueryMovieSearch({
    text: debouncedText,
  });

  const options = [...(query.data?.results || [])];

  return (
    <Autocomplete
      onInputChange={(e, newText) => {
        setText(newText);
      }}
      onChange={(e, option) => {
        if (option) {
          reviewForm.setReview({
            ...reviewForm.review,
            mediaId: {
              tmdbMediaId: Number(option.id),
              tmdbMediaType: TmdbMediaType.movie,
            },
          });
        }
      }}
      getOptionLabel={(option) => option.title}
      renderOption={(option) => <MovieListItem disabled movie={option} />}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Choose Movie"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {query.isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default () => {
  const reviewForm = useReviewForm();
  if (reviewForm.review.mediaId) {
    return <Media mediaId={reviewForm.review.mediaId} />;
  }
  return (
    <Box p={2}>
      <MediaSearch />
    </Box>
  );
};
