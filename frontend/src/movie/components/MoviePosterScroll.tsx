import { Box, BoxProps } from "@material-ui/core";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import MovieCard, { Movie } from "./MoviePosterCard";

interface Props {
  movies: Movie[];
  ItemBoxProps?: BoxProps;
}

export default (props: Props) => {
  const { movies, ItemBoxProps } = props;
  return (
    <HorizontalScroll paddingLeft={2} marginBottom={2} width="100%">
      {movies.map((movie) => (
        <Box width="180px" key={movie.id} marginRight={1} {...ItemBoxProps}>
          <MovieCard movie={movie} />
        </Box>
      ))}
    </HorizontalScroll>
  );
};
