import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { authForm } from "../auth/auth-form/redux/auth-form";
import { auth } from "../auth/redux/auth";
import { discoverParams } from "../discover/redux/discover-params";
import { discoverMovieUi } from "../discover/redux/discover-movie-ui";
import { addListItemsForm } from "../lists/redux/add-list-items-form";
import { history } from "../navigation/history/history";
import { personPageUi } from "../person/redux/person-page-ui";
import { search } from "../search/redux/search";
import { snackbar } from "../snackbar/redux/snackbar";
import { video } from "../video/redux/video";
import { discoverTags } from "../discover/redux/discover-tags";
import { AppState } from "./types";

const reducers: { [key in keyof AppState]: Reducer } = {
  addListItemsForm: addListItemsForm.reducer,
  auth: auth.reducer,
  authForm: authForm.reducer,
  discoverTags: discoverTags.reducer,
  discoverParams: discoverParams.reducer,
  discoverMovieUi: discoverMovieUi.reducer,
  history: history.reducer,
  personPageUi: personPageUi.reducer,
  search: search.reducer,
  snackbar: snackbar.reducer,
  video: video.reducer,
};

export const rootReducer = combineReducers(reducers);
