import {
  Box,
  Chip,
  CircularProgress,
  Fade,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import * as R from "ramda";
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Scroll from "../common/Scroll";
import MoviePoster from "../movie/MoviePoster";
import PersonProfile from "../person/PersonProfile";
import Header from "./Header";
import PersonAvatar from "../person/PersonAvatar";
import PageHistory from "../common/PageHistory";
import MovieBackdrop from "../movie/MovieBackdrop";
import LoadingPage from "../common/LoadingPage";
import HorizontalScroll from "../common/HorizontalScroll";

const renderPoster = (movie, index) => {
  return (
    <div
      style={{ width: "120px" }}
      // onClick={() => history.push(`/movie/${movie.id}`)}
    >
      <MoviePoster movie={movie} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  posterContainer: {
    width: 120,

    margin: theme.spacing(1),
  },
}));

const MovieScroll = ({ movies }) => {
  const classes = useStyles();
  const controls = useAnimation();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
        flexWrap: "nowrap",
        overflowY: "none",
      }}
    >
      {movies.map((movie) => (
        <motion.div key={movie.id} animate={controls}>
          <div className={classes.posterContainer}>
            <MoviePoster movie={movie} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const renderMovieScroll = (title, movies) => (
  <React.Fragment>
    <Box p={1}>
      <Typography variant="h6">{title}</Typography>
    </Box>
    <HorizontalScroll>
      {movies.map((movie) => (
        <MoviePoster
          key={movie.id}
          movie={movie}
          minWidth="120px"
          marginX={1}
        />
      ))}
    </HorizontalScroll>
  </React.Fragment>
);

const renderProfile = (person) => (
  <Box key={person.id} minWidth="120px" p={1}>
    <PersonAvatar person={person} />
    <Box p={1}>
      <Typography>{person.name}</Typography>
    </Box>
  </Box>
);

const renderAvatarScroll = (title, persons) => (
  <React.Fragment>
    <Box p={1}>
      <Typography variant="h6">{title}</Typography>
    </Box>
    <HorizontalScroll>{persons.map(renderProfile)}</HorizontalScroll>
  </React.Fragment>
);

Promise.objectAll = async (object) => {
  const values = await Promise.all(R.values(object));
  return R.zipObj(R.keys(object), values);
};

const fetchHomePage = () =>
  Promise.objectAll({
    popular: axios.get("/api/tmdb/movie/popular").then((res) => res.data),
    personPopular: axios
      .get("/api/tmdb/person/popular")
      .then((res) => res.data),
    upcoming: axios.get("/api/tmdb/movie/upcoming").then((res) => res.data),
    topRated: axios.get("/api/tmdb/movie/topRated").then((res) => res.data),
    nowPlaying: axios.get("/api/tmdb/movie/nowPlaying").then((res) => res.data),
  });

export default () => {
  const query = useQuery(["discover"], () => fetchHomePage(), {});
  const genresQuery = useQuery(
    "genres",
    () => axios.get("/api/tmdb/genre/movie/list").then((res) => res.data),
    {}
  );

  if (query.status !== "success") {
    return <LoadingPage />;
  }

  const {
    data: { personPopular, popular, topRated, upcoming, nowPlaying },
  } = query;

  return (
    <Fade in>
      <div>
        <Header movies={popular.results} />
        {renderMovieScroll("Top Rated Movies", topRated.results)}
        {renderMovieScroll("Upcoming Movies", upcoming.results)}
        {renderMovieScroll("Now Playing Movies", nowPlaying.results)}
        {renderAvatarScroll("Popular People", personPopular.results)}
        <PageHistory />
      </div>
    </Fade>
  );
};
