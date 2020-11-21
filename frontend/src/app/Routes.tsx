import React from "react";
import { Route, Switch } from "react-router";
import DiscoverMoviePage from "../discover/DiscoverMoviePage";
import HomePage from "../home/HomePage";
import AutoListPage from "../list/AutoListPage";
import ListPage from "../list/ListPage";
import MoviePage from "../movie/MoviePage";
import PersonPage from "../person/PersonPage";
import SearchPage from "../search/SearchPage.Mobile";
import AuthPage from "../user/auth/auth-form/AuthPage";
import CurrentUserPage from "../user/CurrentUserPage";
import UserPage from "../user/UserPage";
import Modals from "./modals/Modals";
import Snackbar from "./modals/Snackbar";
import { BottomNavigationGutter } from "./navigation/Navigation.Mobile";

export default () => {
  return (
    <React.Fragment>
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
      <Modals />
      <Snackbar />
      <BottomNavigationGutter />
    </React.Fragment>
  );
};
