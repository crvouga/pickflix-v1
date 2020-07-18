import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import React from "react";
import DiscoverPage from "../discover";
import HomePage from "../home";
import MoviePage from "../movie";
import NavigationBarBottom from "./NavigationBarBottom";
import PersonPage from "../person";
import SearchPage from "../search";
import VideoModal from "../video/VideoModal";
import { AnimatedRoute, AnimatedSwitch } from "./animated-react-router";
import Providers from "./Providers";
import ChatModal from "../chat/ChatModal";

const UnauthenticatedApp = () => {
  return (
    <React.Fragment>
      <ChatModal />
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

export default () => {
  return (
    <Providers>
      <CssBaseline />
      <Container style={{ padding: 0 }} maxWidth="xs">
        <UnauthenticatedApp />
      </Container>
      <NavigationBarBottom />
    </Providers>
  );
};
