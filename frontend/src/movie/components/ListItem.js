import { ButtonBase, makeStyles, Typography } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import { useQuery } from "react-query";
import api from "../../api";
import MovieBackdrop from "./MovieBackdrop";

const useStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(1),
    width: "100%",
    display: "flex",
    textAlign: "left",
  },
  itemImage: {
    width: "50%",
    marginRight: theme.spacing(1),
  },
  itemText: {˜
    flex: 1,
    overflow: "hidden",
    height: "100%",
    maxHeight: "100%",

    marginBottom: "auto",
  },
  noContentMessage: {
    textAlign: "center",
    color: theme.palette.text.disabled,
    padding: theme.spacing(4),
  },
}));

const makeSubtitle1 = (movie) =>
  [
    movie.releaseDate,
    movie.runtime 
    movie.voteCount > 0 && `${movie.voteAverage}/10 ★`,
    movie.status !== "Released" && movie.status,
  ]
    .filter(R.identity)
    .join(" · ");

const makeSubtitle2 = R.pipe(
  (allGenres, movie) =>
    R.innerJoin(
      (genre, genreId) => genre.id === genreId,
      allGenres,
      movie.genreIds
    ),
  R.pluck("name"),
  R.join(" · ")
);

export default ({ movie, ...props }) => {
  const classes = useStyles();
  const genresQuery = useQuery(
    "genres",
    () => api.get("/api/tmdb/genre/movie/list").then((res) => res.data),
    {
      staleTime: Infinity,
    }
  );
  const allGenres = R.pathOr([], ["data", "genres"], genresQuery);

  return (
    <ButtonBase component="div" className={classes.item} {...props}>
      <div className={classes.itemImage}>
        <MovieBackdrop movie={movie} />
      </div>
      <div className={classes.itemText}>
        <Typography>{movie.title}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {makeSubtitle1(movie)}
        </Typography>
        <Typography
          style={{ fontStyle: "italic" }}
          noWrap
          variant="subtitle2"
          color="textSecondary"
        >
          {makeSubtitle2(allGenres, movie)}
        </Typography>
      </div>
    </ButtonBase>
  );
};
