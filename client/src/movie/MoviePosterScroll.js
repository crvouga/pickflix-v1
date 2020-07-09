import React from "react";
import HorizontalScroll from "../common/HorizontalScroll";
import MoviePoster from "./MoviePoster";

export default ({ movies, ContainerProps, PosterProps }) => {
  return (
    <HorizontalScroll paddingLeft={2} marginBottom={2} {...ContainerProps}>
      {movies.map((movie) => (
        <MoviePoster
          key={movie.id}
          movie={movie}
          minWidth={150}
          maxWidth={150}
          marginRight={1}
          {...PosterProps}
        />
      ))}
    </HorizontalScroll>
  );
};
