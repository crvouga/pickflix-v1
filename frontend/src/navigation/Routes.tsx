import React from "react";
import { Route, Switch } from "react-router";
import AuthPage from "../auth-form/AuthPage";
import DiscoverPage from "../discover/DiscoverMoviePage";
import DiscoverSearchPage from "../discover/search/DiscoverSearchPage";
import HomePage from "../home";
import ListPage from "../lists/ListPage";
import CollectionPage from "../movie/collection/CollectionPage";
import CreditsPage from "../movie/credits/CreditsPage";
import MoviePage from "../movie/MoviePage";
import MovieVideoPage from "../movie/video/MovieVideoPage";
import PersonPage from "../person";
import ProfilePage from "../profile/ProfilePage";

import Snackbar from "../snackbar/Snackbar";
import VideoPage from "../video/VideoPage";
import Modals from "./modals/Modals";

export default () => {
  return (
    <React.Fragment>
      <Modals />

      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route path="/discover/search" component={DiscoverSearchPage} />
        <Route path="/discover" component={DiscoverPage} />

        <Route path="/video" component={VideoPage} />

        <Route path="/movie/:tmdbMediaId/video" component={MovieVideoPage} />
        <Route path="/movie/:tmdbMediaId/credits" component={CreditsPage} />
        <Route path="/movie/:tmdbMediaId" component={MoviePage} />

        <Route path="/person/:personId" component={PersonPage} />

        <Route path="/collection/:collectionId" component={CollectionPage} />

        <Route path="/list/:listId" component={ListPage} />

        <Route path="/profile" component={ProfilePage} />

        <Route path="/auth" component={AuthPage} />
      </Switch>

      <Snackbar />
    </React.Fragment>
  );
};
