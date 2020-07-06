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

const renderProfile = (person, index) => (
  <Box width="120px">
    <PersonAvatar person={person} />
    <Box p={1}>
      <Typography>{person.name}</Typography>
    </Box>
  </Box>
);

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

Promise.objectAll = async (object) => {
  const values = await Promise.all(R.values(object));
  return R.zipObj(R.keys(object), values);
};

export default () => {
  const query = useQuery(
    ["discover"],
    () =>
      Promise.objectAll({
        popular: axios.get("/api/tmdb/movie/popular").then((res) => res.data),
        personPopular: axios
          .get("/api/tmdb/person/popular")
          .then((res) => res.data),
        upcoming: axios.get("/api/tmdb/movie/upcoming").then((res) => res.data),
        topRated: axios.get("/api/tmdb/movie/topRated").then((res) => res.data),
        nowPlaying: axios
          .get("/api/tmdb/movie/nowPlaying")
          .then((res) => res.data),
      }),
    {}
  );
  const genresQuery = useQuery(
    "genres",
    () => axios.get("/api/tmdb/genre/movie/list").then((res) => res.data),

    {}
  );

  if (query.status !== "success") {
    return (
      <div
        style={{
          width: "100%",
          marginTop: "30%",
          textAlign: "center",
        }}
      >
        <CircularProgress disableShrink />
      </div>
    );
  }

  const {
    data: { personPopular, popular, topRated, upcoming, nowPlaying },
  } = query;

  return (
    <Fade in>
      <div>
        {/* <Paper
          style={{
            display: "flex",
            overflowX: "auto",
            flexWrap: "nowrap",
            position: "sticky",
            padding: 8,
            borderRadius: 0,
            padding: 12,
            top: R.propOr(
              0,
              "clientHeight",
              document.getElementById("app-bar")
            ),
          }}
        >
          <Chip variant="outlined" label="Movie" />
          {genresQuery.status === "success" &&
            genresQuery.data.genres.map((genre) => (
              <Chip variant="outlined" label={genre.name} />
            ))}
        </Paper> */}

        <Header movies={popular.results} />

        <Scroll
          title="Popular Movies"
          renderItem={renderPoster}
          items={popular.results}
        />
        <Scroll
          title="Top Rated Movies"
          renderItem={renderPoster}
          items={topRated.results}
        />
        <Scroll
          title="Upcoming Movies"
          renderItem={renderPoster}
          items={upcoming.results}
        />
        <Scroll
          title="Now Playing Movies"
          renderItem={renderPoster}
          items={nowPlaying.results}
        />
        <Scroll
          title="Popular People"
          renderItem={renderProfile}
          items={personPopular.results}
        />
      </div>
    </Fade>
  );
};
