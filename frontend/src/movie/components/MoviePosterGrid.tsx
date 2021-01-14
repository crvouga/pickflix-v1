import { Grid, Box, makeStyles } from "@material-ui/core";
import { repeat } from "ramda";
import React from "react";
import MoviePosterCard, { Movie } from "./MoviePosterCard";

type ResponsiveGridProps<T> = {
  items: T[];
  toItemKey: (item: T, index?: number) => string;
  renderItem: (item: T) => React.ReactNode;
};

const useStyles = makeStyles(() => ({
  container: {
    // scrollSnapType: "y proximity",
    // overflowY: "scroll",
    // transform: "translateZ(0)",
    // "& *": {
    //   flexShrink: 0,
    // },
  },
  item: {
    // scrollSnapAlign: "start",
  },
}));

export const ResponsiveGrid = <T,>({
  items,
  toItemKey,
  renderItem,
}: ResponsiveGridProps<T>) => {
  const classes = useStyles();
  return (
    <Box p={1}>
      <Grid container spacing={1} className={classes.container}>
        {items.map((item, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            key={toItemKey(item, index)}
            className={classes.item}
          >
            {renderItem(item)}
          </Grid>
        ))}
      </Grid>
    </Box>
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
