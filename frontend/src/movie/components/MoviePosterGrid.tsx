import { Grid } from "@material-ui/core";
import { repeat } from "ramda";
import React from "react";
import MoviePosterCard, { Movie } from "./MoviePosterCard";

type ResponsiveGridProps<T> = {
  items: T[];
  toItemKey: (item: T, index?: number) => string;
  renderItem: (item: T) => React.ReactNode;
};

export const ResponsiveGrid = <T,>({
  items,
  toItemKey,
  renderItem,
}: ResponsiveGridProps<T>) => {
  return (
    <Grid container spacing={1}>
      {items.map((item, index) => (
        <Grid item xs={6} sm={4} md={3} key={toItemKey(item, index)}>
          {renderItem(item)}
        </Grid>
      ))}
    </Grid>
  );
};

type MoviePosterGridProps = {
  movies: Movie[];
};

export const MoviePosterGrid = (props: MoviePosterGridProps) => {
  const { movies } = props;
  const responsiveGridProps: ResponsiveGridProps<Movie> = {
    items: movies,
    toItemKey: (movie, index) => [movie.id, index].join(" "),
    renderItem: (movie) => <MoviePosterCard movie={movie} />,
  };
  return <ResponsiveGrid {...responsiveGridProps} />;
};

export const MoviePosterGridSkeleton = ({
  posterCount,
}: {
  posterCount: number;
}) => {
  return <MoviePosterGrid movies={repeat({ title: "" }, posterCount)} />;
};

export default MoviePosterGrid;
