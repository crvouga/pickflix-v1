import { Container, CssBaseline } from "@material-ui/core";
import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router";
import ChatModal from "../chat/ChatModal";
import DiscoverPage from "../discover";
import HomePage from "../home";
import MoviePage from "../movie";
import PersonPage from "../person";
import SearchPage from "../search";
import VideoModal from "../video/VideoModal";
import NavigationBarBottom from "./NavigationBarBottom";
import Providers from "./Providers";

const UnauthenticatedApp = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <React.Fragment>
      <ChatModal />
      <VideoModal />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/discover" component={DiscoverPage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/movie/:movieId" component={MoviePage} />
        <Route exact path="/person/:personId" component={PersonPage} />
      </Switch>
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
