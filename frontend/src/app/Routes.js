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
import Modals from "./Modals";

export default () => {
  const isAuthenthicated = useSelector(selectors.auth.isAuthenticated);
  const pathname = useSelector(selectors.router.pathname);
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
          <Route path="/movie/:movieId" component={MoviePage} />
          <Route path="/person/:personId" component={PersonPage} />
          <Route
            path="/profile"
            component={isAuthenthicated ? ProfilePage : SignInPage}
          />
          <Route path="/list/:listId" component={ListPage} />
        </Switch>
      </Container>
      <NavigationBarBottom />
    </React.Fragment>
  );
};
