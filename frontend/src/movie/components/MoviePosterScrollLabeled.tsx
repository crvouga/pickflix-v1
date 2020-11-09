import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Movie } from "./MoviePosterCard";
import MoviePosterScroll from "./MoviePosterScroll";

type Props = {
  label: string;
  movies: Movie[];
};

export default ({ label, movies }: Props) => {
  return (
    <React.Fragment>
      <Box paddingX={2}>
        <Typography gutterBottom variant="h6">
          {label}
        </Typography>
      </Box>
      <MoviePosterScroll movies={movies} />
    </React.Fragment>
  );
};
