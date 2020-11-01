import React from "react";
import { Route, Switch } from "react-router";
import AuthPage from "../auth-form/AuthPage";
import DiscoverPage from "../discover/DiscoverMoviePage";
import HomePage from "../home";
import ListPage from "../lists/ListPage";
import MoviePage from "../movie/MoviePage";
import PersonPage from "../person/legacy";
import ProfilePage from "../profile/ProfilePage";
import Snackbar from "../snackbar/Snackbar";
import Modals from "./modals/Modals";

export default () => {
  return (
    <React.Fragment>
      <Modals />
      <Snackbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/discover" component={DiscoverPage} />
        <Route path="/movie/:tmdbMediaId" component={MoviePage} />
        <Route path="/person/:tmdbMediaId" component={PersonPage} />
        <Route path="/list/:listId" component={ListPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/auth" component={AuthPage} />
      </Switch>
    </React.Fragment>
  );
};
