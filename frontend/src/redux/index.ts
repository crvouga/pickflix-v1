import { combineReducers } from "@reduxjs/toolkit";
import { spawn } from "redux-saga/effects";
import auth from "../auth/redux";
import signInForm from "../auth/signInForm/redux";
import { discoverMovie } from "../discover/redux/discover-movie";
import { discoverMovieSaga } from "../discover/redux/discover-movie-saga";
import { addListItemsForm } from "../lists/redux/add-list-items-form";
import personPage from "../person/redux";
import querySaga from "../query/query-saga";
import { search } from "../search/redux/search";
import { snackbar } from "../snackbar/redux/snackbar";
import video from "../video/redux";
import recentlyViewed from "./recently-viewed";

export const actions = Object.freeze({
  video: video.actions,
  recentlyViewed: recentlyViewed.actions,
  auth: auth.actions,
  signInForm: signInForm.actions,
  personPage: personPage.actions,
});

export const selectors = Object.freeze({
  video: video.selectors,
  recentlyViewed: recentlyViewed.selectors,
  auth: auth.selectors,
  signInForm: signInForm.selectors,
  personPage: personPage.selectors,
});

function* rootSaga() {
  yield* [
    spawn(snackbar.saga),
    spawn(video.saga),
    spawn(recentlyViewed.saga),
    spawn(auth.saga),
    spawn(signInForm.saga),
    spawn(querySaga),
    spawn(discoverMovieSaga),
  ];
}

const rootReducer = combineReducers({
  snackbar: snackbar.reducer,
  video: video.reducer,
  discoverMovie: discoverMovie.reducer,
  recentlyViewed: recentlyViewed.reducer,
  signInForm: signInForm.reducer,
  auth: auth.reducer,
  personPage: personPage.reducer,
  addListItemsForm: addListItemsForm.reducer,
  search: search.reducer,
});

export const configureRoot = () => {
  return {
    reducer: rootReducer,
    saga: rootSaga,
  };
};
