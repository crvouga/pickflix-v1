import {
  Box,
  BoxProps,
  Container,
  Typography,
  Hidden,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import HorizontalScroll from "../common/components/HorizontalScroll";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import MoviePosterScroll from "../movie/components/MoviePosterScroll";

import PersonAvatar from "../person/PersonAvatar";
import PageHistory from "./page-history/PageHistory";
import { getHomePage, queryKeys } from "./query";
import PickflixLogo from "../common/PickflixLogo";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";

const Title = ({ children, ...props }: BoxProps) => (
  <Box paddingX={2} {...props}>
    <Typography gutterBottom variant="h6">
      {children}
    </Typography>
  </Box>
);

export default () => {
  const query = useQuery(queryKeys.homePage(), () => getHomePage(), {});

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  const {
    data: { personPopular, popular, topRated, upcoming, nowPlaying },
  } = query;

  return (
    <React.Fragment>
      <Hidden smUp>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <Box width="100%" display="flex" justifyContent="center">
              <PickflixLogo />
            </Box>
          </Toolbar>
        </AppBar>
      </Hidden>
      <ResponsiveNavigation />

      <Container disableGutters maxWidth="md">
        <Box>
          <PageHistory />

          <Title>Popular</Title>
          <MoviePosterScroll movies={popular.results} />

          <Title>Top Rated</Title>
          <MoviePosterScroll movies={topRated.results} />

          <Title>Upcoming</Title>
          <MoviePosterScroll movies={upcoming.results} />

          <Title>Now Playing</Title>
          <MoviePosterScroll movies={nowPlaying.results} />

          <Title>Popular People</Title>
          <HorizontalScroll paddingLeft={2}>
            {personPopular.results.map((person) => (
              <Box key={person.id} width="120px" marginRight={1}>
                <PersonAvatar person={person} />
                <Box p={1}>
                  <Typography noWrap>{person.name}</Typography>
                </Box>
              </Box>
            ))}
          </HorizontalScroll>
        </Box>
      </Container>
    </React.Fragment>
  );
};
