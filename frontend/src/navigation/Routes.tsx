import { Container, CssBaseline } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router";
import AccountPage from "../auth/AccountPage";
import SignInPage from "../auth/SignInPage";
import DiscoverPage from "../discover/DiscoverMoviePage";
import HomePage from "../home";
import ListPage from "../lists/ListPage";
import WatchNextPage from "../lists/auto-list/AutoListPage";
import MoviePage from "../movie";
import CollectionPage from "../movie/collection/CollectionPage";
import CreditsPage from "../movie/credits/CreditsPage";
import PersonPage from "../person";
import ProfilePage from "../profile/ProfilePage";
import SearchPage from "../search/SearchPage";
import Snackbar from "../snackbar/Snackbar";
import VideoPage from "../video/VideoPage";
import Modals from "./modals/Modals";
import NavigationBarBottom from "./NavigationBarBottom";
import AutoListPage from "../lists/auto-list/AutoListPage";
import DiscoverSearchPage from "../discover/discover-search/DiscoverSearchPage";

export default () => {
  return (
    <React.Fragment>
      <Modals />
      <Container disableGutters maxWidth="xs">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/discover/search" component={DiscoverSearchPage} />
          <Route path="/discover" component={DiscoverPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/video" component={VideoPage} />
          <Route path="/movie/:movieId/credits" component={CreditsPage} />
          <Route path="/movie/:movieId" component={MoviePage} />
          <Route path="/person/:personId" component={PersonPage} />
          <Route path="/collection/:collectionId" component={CollectionPage} />
          <Route path="/list/:listId" component={ListPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/signIn" component={SignInPage} />
          <Route path="/auto-list/:autoListKey" component={AutoListPage} />
        </Switch>
        <Snackbar />
        <NavigationBarBottom />
      </Container>
    </React.Fragment>
  );
};
