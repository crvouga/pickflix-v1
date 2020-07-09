import {
  Box,
  Chip,
  CircularProgress,
  Fade,
  makeStyles,
  Collapse,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import * as R from "ramda";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import HorizontalScroll from "../../common/HorizontalScroll";
import * as utils from "../../utils";
import MoviePoster from "../MoviePoster";

const makeSubtitle1 = (movie) =>
  [
    movie.releaseDate && utils.releaseDateToYear(movie.releaseDate),
    movie.runtime && utils.minutesToHoursAndMinutes(movie.runtime),
    movie.voteCount > 0 && `${movie.voteAverage}/10 ★`,
    movie.status !== "Released" && movie.status,
  ]
    .filter((_) => _)
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

const width = 180;

const useStyles = makeStyles((theme) => ({
  thumbnail: {
    width: width,
    height: (9 / 16) * width,
    marginRight: theme.spacing(1),
  },
  itemImage: {
    width: "100%",
  },
  itemText: {
    paddingTop: theme.spacing(1),

    display: "flex",
    flexDirection: "row",
  },
  itemTitle: {
    flex: 1,
  },
  scroll: {
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
  },
  title: {
    padding: theme.spacing(1),
    paddingBottom: 0,
    fontWeight: "bold",
  },
  item: {
    minWidth: "150px",
    padding: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(1),

    marginRight: 0,
  },
}));

export default ({ similar, recommendations, keywords }) => {
  const classes = useStyles();
  const history = useHistory();
  const { movieId } = useParams();

  const handleMovieClick = (movie) => () => {
    history.push(`/movie/${movie.id}`);
  };

  const [selectedKeyword, setSelectedKeyword] = useState(
    keywords.keywords?.[0]
  );

  const moviesFromKeywordQuery = useQuery(
    ["movie", selectedKeyword?.id],
    () =>
      selectedKeyword &&
      axios
        .get("/api/tmdb/discover/movie", {
          params: { withKeywords: [selectedKeyword.id] },
        })
        .then((res) => res.data),

    {}
  );

  const moviesFromKeyword = R.pipe(
    R.pathOr([], ["data", "results"]),
    R.reject(R.where({ id: R.eqBy(String, movieId) }))
  )(moviesFromKeywordQuery);

  const renderMovie = (movie) => (
    <Box minWidth={120} maxWidth={120} onClick={handleMovieClick(movie)} m={1}>
      <MoviePoster movie={movie} />
      {/* <Typography className={classes.itemTitle}>{movie.title}</Typography> */}
      {/* <Typography color="textSecondary" className={classes.itemYear}>
        {utils.releaseDateToYear(movie?.releaseDate || "") || ""}
      </Typography> */}
    </Box>
  );

  return (
    <React.Fragment>
      {similar?.results?.length > 0 && (
        <React.Fragment>
          <Typography className={classes.title}>Similar</Typography>
          <HorizontalScroll>
            {similar?.results?.map(renderMovie)}
          </HorizontalScroll>
        </React.Fragment>
      )}

      {recommendations?.results?.length > 0 && (
        <React.Fragment>
          <Typography className={classes.title}>Recommendations</Typography>
          <HorizontalScroll>
            {recommendations?.results?.map(renderMovie)}
          </HorizontalScroll>
        </React.Fragment>
      )}

      {keywords.keywords.length > 0 && (
        <React.Fragment>
          <Typography className={classes.title}>Keywords</Typography>

          <HorizontalScroll>
            {keywords.keywords.map((keyword) => (
              <Chip
                className={classes.chip}
                key={keyword.id}
                label={keyword.name}
                clickable
                variant={
                  keyword.id === selectedKeyword?.id ? "default" : "outlined"
                }
                onClick={() => setSelectedKeyword(keyword)}
              />
            ))}
          </HorizontalScroll>

          <Collapse in={moviesFromKeywordQuery.status === "success"}>
            <HorizontalScroll>
              {moviesFromKeyword.map(renderMovie)}
            </HorizontalScroll>
          </Collapse>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
