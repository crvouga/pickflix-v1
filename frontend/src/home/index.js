import { Box, Typography } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import { useQuery } from "react-query";
import api from "../api";
import HorizontalScroll from "../common/components/HorizontalScroll";
import ErrorPage from "../common/page/ErrorPage";
import Footer from "../common/page/Footer";
import Page from "../common/page/Page";
import Poster from "../movie/components/Poster";
import PersonAvatar from "../person/PersonAvatar";
import Header from "./Header";
import SkeletonPage from "./SkeletonPage";

const Title = ({ text, ...props }) => (
  <Box
    component={Typography}
    paddingLeft={2}
    paddingBottom={1}
    style={{ fontWeight: "bold" }}
    {...props}
  >
    {text}
  </Box>
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
    <Title text={title} />
    <Box p={1} paddingLeft={2}>
      <Typography style={{ fontWeight: "bold" }}>{title}</Typography>
    </Box>
    <HorizontalScroll paddingLeft={2}>
      {persons.map(renderProfile)}
    </HorizontalScroll>
  </React.Fragment>
);

const renderMovieScroll = (title, movies) => (
  <React.Fragment>
    <Title text={title} />
    <HorizontalScroll paddingLeft={2} marginBottom={2}>
      {movies.map((movie, i) => (
        <Poster key={i} movie={movie} marginRight={2} />
      ))}
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
      {renderMovieScroll("Top Rated", topRated.results)}
      {renderMovieScroll("Trending", upcoming.results)}
      {renderMovieScroll("Now Playing", nowPlaying.results)}
      {renderAvatarScroll("Popular People", personPopular.results)}
      <Footer />
    </Page>
  );
};
