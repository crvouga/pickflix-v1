import { Container, CssBaseline } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router";
import AccountPage from "../account";
import AuthPage from "../auth";
import ChatModal from "../chat/ChatModal";
import LoadingPage from "../common/page/LoadingPage";
import DiscoverPage from "../discover";
import HomePage from "../home";
import MoviePage from "../movie";
import PersonPage from "../person";
import SearchPage from "../search";
import VideoModal from "../video/VideoModal";
import NavigationBarBottom from "./NavigationBarBottom";

const UnauthenticatedApp = () => {
  return (
    <React.Fragment>
      <ChatModal />
      <VideoModal />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/discover" component={DiscoverPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/movie/:movieId" component={MoviePage} />
        <Route path="/person/:personId" component={PersonPage} />
        <Route path="/account" component={AuthPage} />
      </Switch>
    </React.Fragment>
  );
};

const AuthenticatedApp = () => {
  return (
    <React.Fragment>
      <ChatModal />
      <VideoModal />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/discover" component={DiscoverPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/movie/:movieId" component={MoviePage} />
        <Route path="/person/:personId" component={PersonPage} />
        <Route path="/account" component={AccountPage} />
      </Switch>
    </React.Fragment>
  );
};

export default () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const auth = useSelector((state) => state.firebase.auth);
  console.log({ auth });
  return (
    <React.Fragment>
      <CssBaseline />
      <Container disableGutters maxWidth="xs">
        {!auth.isLoaded ? (
          <LoadingPage />
        ) : auth.isEmpty ? (
          <UnauthenticatedApp />
        ) : (
          <AuthenticatedApp />
        )}
      </Container>
      <NavigationBarBottom />
    </React.Fragment>
  );
};
