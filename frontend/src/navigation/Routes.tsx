import React from "react";
import { Route, Switch } from "react-router";
import AuthPage from "../auth/auth-form/AuthPage";
import DiscoverMoviePage from "../discover/DiscoverMoviePage";
import ListPage from "../lists/ListPage";
import MoviePage from "../movie/MoviePage";
import PersonPage from "../person/PersonPage";
import CurrentUserPage from "../users/CurrentUserPage";
import Snackbar from "../snackbar/Snackbar";
import Modals from "./modals/Modals";
import HomePage from "../home/HomePage";
import SearchPage from "../search/SearchPage.Mobile";
import UserPage from "../users/UserPage";
import AutoListPage from "../lists/auto-lists/AutoListPage";
import { BottomNavigationGutter } from "./Navigation.Mobile";

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
        <Route path="/auto-list/:autoListId" component={AutoListPage} />
        <Route path="/user/:username" component={UserPage} />
        <Route path="/user" component={CurrentUserPage} />
        <Route path="/auth" component={AuthPage} />
      </Switch>
      <BottomNavigationGutter />
    </React.Fragment>
  );
};
