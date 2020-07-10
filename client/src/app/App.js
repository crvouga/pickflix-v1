import {
  CssBaseline,
  makeStyles,
  Container,
  AppBar,
  Typography,
  Toolbar,
  Button,
  Box,
} from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import ScrollToTop from "../common/ScrollToTop";
import HomePage from "../home/HomePage";
import MoviePage from "../movie/MoviePage";
import NavigationBarBottom from "../navigation/mobile/NavigationBarBottom";
import NavigationDrawer from "../navigation/mobile/NavigationDrawer";
import PersonPage from "../person";
import SearchDialog from "../search/SearchDialog";
import VideoModal from "../video/VideoModal";
import Providers from "./Providers";
import SearchPage from "../search/SearchPage";

const UnauthenticatedApp = () => {
  return (
    <React.Fragment>
      <NavigationDrawer />
      <SearchDialog />
      <VideoModal />
      <Switch>
        <Route path="/" exact render={() => <HomePage />} />
        <Route path="/search" render={() => <SearchPage />} />
        <Route
          path="/movie/:movieId"
          render={({ match }) => <MoviePage movieId={match.params.movieId} />}
        />
        <Route
          path="/person/:personId"
          render={({ match }) => (
            <PersonPage personId={match.params.personId} />
          )}
        />
      </Switch>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    " -webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
    "touch-action": "manipulation",
    padding: 0,
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Providers>
      <ScrollToTop />
      <CssBaseline />
      <Container maxWidth="xs" className={classes.root}>
        <UnauthenticatedApp />
      </Container>
      <NavigationBarBottom />
    </Providers>
  );
};
