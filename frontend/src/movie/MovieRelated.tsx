import { Box, Typography } from "@material-ui/core";
import { take, uniqBy } from "ramda";
import React from "react";
import { MovieRecommendations, MovieSimilar } from "../tmdb/types";
import MoviePosterCardScroll from "./components/MoviePosterCardScroll";

export default ({
  similar,
  recommendations,
}: {
  similar: MovieSimilar;
  recommendations: MovieRecommendations;
}) => {
  const movies = take(
    15,
    uniqBy((movie) => movie.id, [
      ...similar.results,
      ...recommendations.results,
    ])
  );

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
