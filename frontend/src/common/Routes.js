import { Container, CssBaseline } from "@material-ui/core";
import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router";
import AccountPage from "../auth/account";
import SignInPage from "../auth/signIn";
import ChatModal from "../chat/ChatModal";
import DiscoverPage from "../discover";
import HomePage from "../home";
import MoviePage from "../movie";
import PersonPage from "../person";
import SearchPage from "../search";
import VideoModal from "../video/VideoModal";
import NavigationBarBottom from "./NavigationBarBottom";

export default () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container disableGutters maxWidth="xs">
        <ChatModal />
        <VideoModal />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/discover" component={DiscoverPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/movie/:movieId" component={MoviePage} />
          <Route path="/person/:personId" component={PersonPage} />
          <Route path="/signIn" component={SignInPage} />
          <Route path="/account" component={AccountPage} />
        </Switch>
      </Container>
      <NavigationBarBottom />
    </React.Fragment>
  );
};
