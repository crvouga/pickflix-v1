import { Box, Typography } from "@material-ui/core";
import axios from "axios";
import * as R from "ramda";
import React from "react";
import { useQuery } from "react-query";
import HorizontalScroll from "../common/components/HorizontalScroll";
import Footer from "../common/page/Footer";
import LoadingPage from "../common/page/LoadingPage";
import Page from "../common/page/Page";
import MoviePosterScroll from "../movie/components/PosterScroll";
import PersonAvatar from "../person/PersonAvatar";
import Header from "./Header";

const renderMovieScroll = (title, movies) => (
  <React.Fragment>
    <Box p={1} paddingLeft={2}>
      <Typography variant="h6">{title}</Typography>
    </Box>
    <MoviePosterScroll movies={movies} />
  </React.Fragment>
);

const renderProfile = (person) => (
  <Box key={person.id} minWidth="120px" marginRight={1}>
    <PersonAvatar person={person} />
    <Box p={1}>
      <Typography style={{ wordBreak: "break-word" }}>{person.name}</Typography>
    </Box>
  </Box>
);

const renderAvatarScroll = (title, persons) => (
  <React.Fragment>
    <Box p={1} paddingLeft={2}>
      <Typography variant="h6">{title}</Typography>
    </Box>
    <HorizontalScroll paddingLeft={2}>
      {persons.map(renderProfile)}
    </HorizontalScroll>
  </React.Fragment>
);

const fetchHomePage = async () => {
  const urlByName = {
    popular: "/api/tmdb/movie/popular",
    personPopular: "/api/tmdb/person/popular",
    upcoming: "/api/tmdb/movie/upcoming",
    topRated: "/api/tmdb/movie/topRated",
    nowPlaying: "/api/tmdb/movie/nowPlaying",
  };
  const names = R.keys(urlByName);
  const urls = R.values(urlByName);
  const responses = await Promise.all(R.map((url) => axios.get(url), urls));
  return R.zipObj(names, R.pluck("data", responses));
};

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
    <Page>
      <Header movies={popular.results} />
      {renderMovieScroll("Top Rated Movies", topRated.results)}
      {renderMovieScroll("Upcoming Movies", upcoming.results)}
      {renderMovieScroll("Now Playing Movies", nowPlaying.results)}
      {renderAvatarScroll("Popular People", personPopular.results)}
      <Footer />
    </Page>
  );
};
