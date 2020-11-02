import { Grid } from "@material-ui/core";
import { repeat } from "ramda";
import React from "react";
import MoviePosterCard, { Movie } from "./MoviePosterCard";

type Props = {
  movies: Movie[];
};

export const MoviePosterGrid = (props: Props) => {
  const { movies } = props;
  return (
    <Grid container spacing={1}>
      {movies.map((movie) => (
        <Grid item xs={6} sm={4} md={3} key={movie.id}>
          <MoviePosterCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export const MoviePosterGridSkeleton = ({
  posterCount,
}: {
  posterCount: number;
}) => {
  return <MoviePosterGrid movies={repeat({ title: "" }, posterCount)} />;
};

export default MoviePosterGrid;
