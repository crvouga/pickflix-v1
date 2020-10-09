import { Box, Typography } from "@material-ui/core";
import { uniqBy } from "ramda";
import React from "react";
import MoviePosterCardScroll from "../components/MoviePosterCardScroll";
import { useMoviePageQuery } from "../data";

export default () => {
  const query = useMoviePageQuery();
  if (!query.data) return null;

  const { similar, recommendations } = query.data;

  const movies = uniqBy((movie) => movie.id, [
    ...similar.results,
    ...recommendations.results,
  ]);

  return (
    <React.Fragment>
      <Box marginLeft={2}>
        <Typography gutterBottom variant="h6">
          People Also Liked
        </Typography>
      </Box>
      <MoviePosterCardScroll movies={movies} />
    </React.Fragment>
  );
};
