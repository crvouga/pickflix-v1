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
import PersonPage from "../person/PersonPage";
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
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Providers>
      <ScrollToTop />
      <CssBaseline />
      <div className={classes.root}>
        {/* <AppBar position="sticky" color="secondary" style={{ color: "white" }}>
          <Toolbar variant="dense">
            <Typography
              color="textPrimary"
              align="center"
              style={{ fontWeight: "bold", flex: 1 }}
            >
              Sign In Here! It's Super Easy!
            </Typography>

            <Button
              variant="contained"
              color="primary"
              style={{ color: "white" }}
            >
              Sign In
            </Button>
          </Toolbar>
        </AppBar> */}
        <UnauthenticatedApp />
        <Box p={2} textAlign="center">
          <Typography gutterBottom color="textSecondary">
            Pickflix is powered by
          </Typography>
          <img
            style={{ width: "80%", maxWidth: "200px" }}
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
          />
        </Box>
        <NavigationBarBottom />
      </div>
    </Providers>
  );
};
