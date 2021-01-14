import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import { AppBarGutter } from "../common/components/AppBarGutter";
import LoadingPage from "../common/page/LoadingPage";
import Modals from "./modals/Modals";
import Snackbar from "./snackbar/Snackbar";
import { AnimatePresence } from "framer-motion";
const HomePage = React.lazy(() => import("../home/HomePage"));
const EmptyPage = React.lazy(() => import("../common/page/EmptyPage"));
const DiscoverMoviePage = React.lazy(
  () => import("../discover/DiscoverMoviePage")
);
const AutoListPage = React.lazy(
  () => import("../list/auto-lists/AutoListPage")
);
const ListPage = React.lazy(() => import("../list/lists/ListPage"));
const MoviePage = React.lazy(() => import("../movie/MoviePage"));
const PersonPage = React.lazy(() => import("../person/PersonPage"));
const SearchPage = React.lazy(() => import("../search/SearchPage.Mobile"));
const AuthPage = React.lazy(() => import("../user/auth/auth-form/AuthPage"));
const CurrentUserPage = React.lazy(() => import("../user/CurrentUserPage"));
const UserPage = React.lazy(() => import("../user/UserPage"));
const ReviewPage = React.lazy(() => import("../review/ReviewPage"));

export default () => {
  return (
    <React.Fragment>
      <Suspense fallback={<LoadingPage />}>
        <AnimatePresence>
          <Switch>
            <Route exact path="/" component={DiscoverMoviePage} />
            <Route path="/discover" component={DiscoverMoviePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/movie/:tmdbMediaId" component={MoviePage} />
            <Route path="/person/:tmdbMediaId" component={PersonPage} />
            <Route path="/list/:listId" component={ListPage} />
            <Route path="/auto-list/:autoListId" component={AutoListPage} />
            <Route path="/user/:userId" component={UserPage} />
            <Route path="/review/:reviewId" component={ReviewPage} />
            <Route path="/current-user" component={CurrentUserPage} />
            <Route path="/auth" component={AuthPage} />
            <Route component={EmptyPage} />
          </Switch>
        </AnimatePresence>
      </Suspense>
      <Modals />
      <Snackbar />
      <AppBarGutter />
    </React.Fragment>
  );
};
