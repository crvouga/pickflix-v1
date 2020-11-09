import {
  AppBar,
  Box,
  Container,
  Hidden,
  Toolbar,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
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
import NewReleasesOutlinedIcon from "@material-ui/icons/NewReleasesOutlined";
import MoviePosterScroll from "../movie/components/MoviePosterScroll";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import TheatersOutlinedIcon from "@material-ui/icons/TheatersOutlined";
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
          <Box paddingBottom={1}>
            <ListItem>
              <ListItemIcon>
                <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Recent" />
            </ListItem>
            <PageHistory />
          </Box>

          {currentUser && currentUser !== "loading" && (
            <RelatedMovies user={currentUser} />
          )}

          <Box paddingBottom={1}>
            <ListItem>
              <ListItemIcon>
                <StarBorderOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Top Rated" />
            </ListItem>
            <MoviePosterScroll movies={topRated.results} />
          </Box>

          <Box paddingBottom={1}>
            <ListItem>
              <ListItemIcon>
                <TrendingUpOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Popular" />
            </ListItem>
            <MoviePosterScroll movies={popular.results} />
          </Box>

          <Box paddingBottom={1}>
            <ListItem>
              <ListItemIcon>
                <TheatersOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Now Playing" />
            </ListItem>
            <MoviePosterScroll movies={nowPlaying.results} />
          </Box>

          <Box paddingBottom={1}>
            <ListItem>
              <ListItemIcon>
                <NewReleasesOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Upcoming" />
            </ListItem>
            <MoviePosterScroll movies={upcoming.results} />
          </Box>

          <Box paddingBottom={1}>
            <ListItem>
              <ListItemIcon>
                <TrendingUpOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Upcoming" />
            </ListItem>

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
        </Box>
      </Container>
    </React.Fragment>
  );
};
