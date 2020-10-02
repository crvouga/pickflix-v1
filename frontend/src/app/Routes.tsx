import { Container, CssBaseline } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import SignInPage from "../auth/signInForm/SignIn";
import NavigationBarBottom from "../common/NavigationBarBottom";
import DiscoverPage from "../discover";
import HomePage from "../home";
import ListPage from "../lists/ListPage";
import MoviePage from "../movie";
import PersonPage from "../person";
import ProfilePage from "../profile";
import { selectors } from "../redux";
import SearchPage from "../search";
import Snackbar from "../snackbar/Snackbar";
import Modals from "./Modals";
import CollectionPage from "../movie/collection/CollectionPage";
import VideoPage from "../video/VideoPage";
import CreditsPage from "../movie/credits/CreditsPage";

export default () => {
  const authStatus = useSelector(selectors.auth.authStatus);
  const {
    location: { pathname },
  } = useSelector(selectors.router.router);
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Modals />
      <Container disableGutters maxWidth="xs">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/discover" component={DiscoverPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/video" component={VideoPage} />
          <Route path="/movie/:movieId/credits" component={CreditsPage} />
          <Route path="/movie/:movieId" component={MoviePage} />
          <Route path="/collection/:collectionId" component={CollectionPage} />
          <Route path="/person/:personId" component={PersonPage} />
          <Route
            path="/profile"
            component={authStatus === "signedOut" ? SignInPage : ProfilePage}
          />
          <Route path="/list/:listId" component={ListPage} />
        </Switch>
      </Container>
      <Snackbar />
      <NavigationBarBottom />
    </React.Fragment>
  );
};
