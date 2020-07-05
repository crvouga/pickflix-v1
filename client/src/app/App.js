import { CssBaseline, makeStyles } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import ScrollToTop from "../common/ScrollToTop";
import HomePage from "../home/HomePage";
import MoviePage from "../movie/MoviePage";
import NavigationBar from "../navigation/mobile/NavigationBar";
import NavigationDrawer from "../navigation/mobile/NavigationDrawer";
import PersonPage from "../person/PersonPage";
import SearchDialog from "../search/SearchDialog";
import VideoModal from "../video/VideoModal";
import Providers from "./Providers";

const UnauthenticatedApp = () => {
  return (
    <React.Fragment>
      <NavigationDrawer />
      <SearchDialog />
      <VideoModal />
      <Switch>
        <Route path="/" exact render={() => <HomePage />} />
        <Route
          path="/movie/:movieId"
          component={MoviePage}
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
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Providers>
      <ScrollToTop />
      <CssBaseline />
      <div className={classes.root}>
        <NavigationBar />
        <UnauthenticatedApp />
      </div>
    </Providers>
  );
};
