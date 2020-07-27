import { Box, Typography } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import { useQuery } from "react-query";
import api from "../api";
import HorizontalScroll from "../common/components/HorizontalScroll";
import ErrorPage from "../common/page/ErrorPage";
import Footer from "../common/page/Footer";
import Page from "../common/page/Page";
import MoviePosterScroll from "../movie/components/PosterScroll";
import PersonAvatar from "../person/PersonAvatar";
import Header from "./Header";
import SkeletonPage from "./SkeletonPage";

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
      <Typography style={{ fontWeight: "bold" }}>{title}</Typography>
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
  const responses = await Promise.all(R.map((url) => api.get(url), urls));
  return R.zipObj(names, R.pluck("data", responses));
};

export default () => {
  const query = useQuery(["discover"], () => fetchHomePage(), {});

  if (query.status === "loading") return <SkeletonPage />;
  if (query.status === "error") return <ErrorPage />;

  const {
    data: { personPopular, popular, topRated, upcoming, nowPlaying },
  } = query;

  return (
    <Page>
      <Header movies={popular.results} />
      <MoviePosterScroll title="Top Rated" movies={topRated.results} />
      <MoviePosterScroll title="Trending" movies={upcoming.results} />
      <MoviePosterScroll title="Now Playing" movies={nowPlaying.results} />
      {renderAvatarScroll("Popular People", personPopular.results)}
      <Footer />
    </Page>
  );
};
