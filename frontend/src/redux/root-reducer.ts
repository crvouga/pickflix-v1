import { combineReducers } from "@reduxjs/toolkit";
import { authForm } from "../auth/auth-form/redux/auth-form";
import { auth } from "../auth/redux/auth";
import { discoverMovie } from "../discover/redux/discover-movie";
import { discoverMovieUi } from "../discover/redux/discover-movie-ui";
import { addListItemsForm } from "../lists/redux/add-list-items-form";
import { history } from "../navigation/history/history";
import { personPageUi } from "../person/redux/person-page-ui";
import { search } from "../search/redux/search";
import { snackbar } from "../snackbar/redux/snackbar";
import { video } from "../video/redux/video";

export const rootReducer = combineReducers({
  addListItemsForm: addListItemsForm.reducer,
  auth: auth.reducer,
  authForm: authForm.reducer,
  discoverMovie: discoverMovie.reducer,
  discoverMovieUi: discoverMovieUi.reducer,
  history: history.reducer,
  personPageUi: personPageUi.reducer,
  search: search.reducer,
  snackbar: snackbar.reducer,
  video: video.reducer,
});
