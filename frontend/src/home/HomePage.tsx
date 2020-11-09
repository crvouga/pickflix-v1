import {
  AppBar,
  Box,
  Container,
  Hidden,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import HorizontalScroll from "../common/components/HorizontalScroll";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import PickflixLogo from "../common/PickflixLogo";
import MoviePosterScrollLabeled from "../movie/components/MoviePosterScrollLabeled";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";
import PersonAvatar from "../person/PersonAvatar";
import useCurrentUser from "../users/useCurrentUser";
import PageHistory from "./page-history/PageHistory";
import { getHomePage, queryKeys } from "./query";
import RelatedMovies from "./RelatedMovies";

export default () => {
  const currentUser = useCurrentUser();
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
          {currentUser && currentUser !== "loading" && (
            <RelatedMovies user={currentUser} />
          )}
          <PageHistory />
          <MoviePosterScrollLabeled label="Popular" movies={popular.results} />
          <MoviePosterScrollLabeled
            label="Top Rated"
            movies={topRated.results}
          />
          <MoviePosterScrollLabeled
            label="Upcoming"
            movies={upcoming.results}
          />
          <MoviePosterScrollLabeled
            label="Now Playing"
            movies={nowPlaying.results}
          />

          <Box paddingX={2}>
            <Typography gutterBottom variant="h6">
              Popular People
            </Typography>
          </Box>
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
