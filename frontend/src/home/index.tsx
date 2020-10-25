import { Box, BoxProps, Typography } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import { useQuery } from "react-query";
import { BackendAPI } from "../backend-api";
import HorizontalScroll from "../common/components/HorizontalScroll";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPageTopLevel from "../common/page/LoadingPageTopLevel";
import MoviePosterCardScroll from "../movie/components/MoviePosterCardScroll";
import NavigationBarTopLevel from "../navigation/NavigationBarTopLevel";
import PersonAvatar from "../person/PersonAvatar";
import { Movie, Person } from "../tmdb/types";

const Title = ({ children, ...props }: BoxProps) => (
  <Box paddingX={2} {...props}>
    <Typography gutterBottom variant="h6">
      {children}
    </Typography>
  </Box>
);

const renderProfile = (person: Person) => (
  <Box key={person.id} width="120px" marginRight={1}>
    <PersonAvatar person={person} />
    <Box p={1}>
      <Typography noWrap>{person.name}</Typography>
    </Box>
  </Box>
);

const renderAvatarScroll = (title: string, persons: Person[]) => (
  <React.Fragment>
    <Title>{title}</Title>
    <HorizontalScroll paddingLeft={2}>
      {persons.map(renderProfile)}
    </HorizontalScroll>
  </React.Fragment>
);

const renderMovieScroll = (title: string, movies: Movie[]) => (
  <React.Fragment>
    <Title>{title}</Title>

    <MoviePosterCardScroll movies={movies} />
  </React.Fragment>
);

const fetchHomePage = async () => {
  const urlByName = {
    popular: "/api/tmdb/movie/popular",
    personPopular: "/api/tmdb/person/popular",
    upcoming: "/api/tmdb/movie/upcoming",
    topRated:
      "/api/tmdb/discover/movie?vote_count.gte=8000&vote_average.gte=8.0",
    nowPlaying: "/api/tmdb/movie/nowPlaying",
  };
  const names = R.keys(urlByName);
  const urls = R.values(urlByName);
  const responses = await Promise.all(
    R.map((url) => BackendAPI.get(url), urls)
  );
  return R.zipObj(names, R.pluck("data", responses));
};

export default () => {
  const query = useQuery(["home"], () => fetchHomePage(), {});

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPageTopLevel />;
  }

  const {
    data: { personPopular, popular, topRated, upcoming, nowPlaying },
  } = query;

  return (
    <React.Fragment>
      <NavigationBarTopLevel />
      <Box paddingY={2}>
        {renderMovieScroll("Popular", popular.results)}
        {renderMovieScroll("Top Rated", topRated.results)}
        {renderMovieScroll("Trending", upcoming.results)}
        {renderMovieScroll("Now Playing", nowPlaying.results)}
        {renderAvatarScroll("Popular People", personPopular.results)}
      </Box>
    </React.Fragment>
  );
};
