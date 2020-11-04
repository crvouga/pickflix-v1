import React from "react";
import { Route, Switch } from "react-router";
import AuthPage from "../auth-form/AuthPage";
import DiscoverMoviePage from "../discover/DiscoverMoviePage";
import ListPage from "../lists/ListPage";
import MoviePage from "../movie/MoviePage";
import PersonPage from "../person/PersonPage";
import ProfilePage from "../profile/ProfilePage";
import Snackbar from "../snackbar/Snackbar";
import Modals from "./modals/Modals";
import HomePage from "../home/HomePage";
import SearchPage from "../search/SearchPage.Mobile";

export default () => {
  return (
    <React.Fragment>
      <Modals />
      <Snackbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/discover" component={DiscoverMoviePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/movie/:tmdbMediaId" component={MoviePage} />
        <Route path="/person/:tmdbMediaId" component={PersonPage} />
        <Route path="/list/:listId" component={ListPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/auth" component={AuthPage} />
      </Switch>
    </React.Fragment>
  );
};
