import { Container, CssBaseline } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import ErrorDialog from "../auth/ErrorDialog";
import SignInDialog from "../auth/signInForm/SignInDialog";
import ChatDialog from "../chat/ChatDialog";
import DiscoverPage from "../discover";
import HomePage from "../home";
import AddToListDialog from "../list/AddToListDialog";
import CreateListDialog from "../list/CreateListDialog";
import MoviePage from "../movie";
import PersonPage from "../person";
import ProfilePage from "../profile";
import { selectors } from "../redux";
import SearchPage from "../search";
import VideoDialog from "../video/VideoDialog";
import NavigationBarBottom from "./NavigationBarBottom";

export default () => {
  const isAuthenticated = useSelector(selectors.auth.isAuthenticated);
  const pathname = useSelector(selectors.router.pathname);
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container disableGutters maxWidth="xs">
        <ErrorDialog />
        <ChatDialog />
        <VideoDialog />
        <AddToListDialog />
        <CreateListDialog />
        <SignInDialog />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/discover" component={DiscoverPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/movie/:movieId" component={MoviePage} />
          <Route path="/person/:personId" component={PersonPage} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </Container>
      <NavigationBarBottom />
    </React.Fragment>
  );
};
