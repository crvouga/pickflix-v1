import { Box } from "@material-ui/core";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import MovieCard, { Movie } from "./MoviePosterCard";

interface Props {
  movies: Movie[];
}

export default (props: Props) => {
  const { movies } = props;
  return (
    <HorizontalScroll paddingLeft={2} marginBottom={2}>
      {movies.map((movie) => (
        <Box width="180px" key={movie.id} marginRight={1}>
          <MovieCard movie={movie} />
        </Box>
      ))}
    </HorizontalScroll>
  );
};
