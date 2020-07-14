import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import React from "react";
import DiscoverPage from "../discover";
import HomePage from "../home";
import MoviePage from "../movie";
import NavigationBarBottom from "../navigation/mobile/NavigationBarBottom";
import PersonPage from "../person";
import SearchPage from "../search";
import VideoModal from "../video/VideoModal";
import { AnimatedRoute, AnimatedSwitch } from "./animated-react-router";
import Providers from "./Providers";

const UnauthenticatedApp = () => {
  return (
    <React.Fragment>
      <VideoModal />
      <AnimatedSwitch>
        <AnimatedRoute exact path="/" component={HomePage} />
        <AnimatedRoute exact path="/discover" component={DiscoverPage} />
        <AnimatedRoute exact path="/search" component={SearchPage} />
        <AnimatedRoute exact path="/movie/:movieId" component={MoviePage} />
        <AnimatedRoute exact path="/person/:personId" component={PersonPage} />
      </AnimatedSwitch>
    </React.Fragment>
  );
};

const useStyles = makeStyles({
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
});

export default () => {
  const classes = useStyles();
  return (
    <Providers>
      <CssBaseline />
      <Container maxWidth="xs" className={classes.root}>
        <UnauthenticatedApp />
      </Container>
      <NavigationBarBottom />
    </Providers>
  );
};
