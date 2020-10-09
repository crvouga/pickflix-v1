import { combineReducers } from "@reduxjs/toolkit";
import { History } from "history";
import { spawn } from "redux-saga/effects";
import auth from "../auth/redux";
import signInForm from "../auth/signInForm/redux";
import discover from "../discover/redux";
import lists from "../lists/redux";
import personPage from "../person/redux";
import search from "../search/redux";
import snackbar from "../snackbar/redux";
import video from "../video/redux";
import recentlyViewed from "./recently-viewed";

export const actions = Object.freeze({
  lists: lists.actions,
  video: video.actions,
  discover: discover.actions,
  search: search.actions,
  recentlyViewed: recentlyViewed.actions,
  auth: auth.actions,
  signInForm: signInForm.actions,
  snackbar: snackbar.actions,
  personPage: personPage.actions,
});

export const selectors = Object.freeze({
  snackbar: snackbar.selectors,
  lists: lists.selectors,
  video: video.selectors,
  discover: discover.selectors,
  search: search.selectors,
  recentlyViewed: recentlyViewed.selectors,
  auth: auth.selectors,
  signInForm: signInForm.selectors,
  personPage: personPage.selectors,
});

function* rootSaga() {
  yield* [
    spawn(snackbar.saga),
    spawn(lists.saga),
    spawn(video.saga),
    spawn(discover.saga),
    spawn(search.saga),
    spawn(recentlyViewed.saga),
    spawn(auth.saga),
    spawn(signInForm.saga),
  ];
}

const rootReducer = combineReducers({
  snackbar: snackbar.reducer,
  lists: lists.reducer,
  video: video.reducer,
  discover: discover.reducer,
  search: search.reducer,
  recentlyViewed: recentlyViewed.reducer,
  signInForm: signInForm.reducer,
  auth: auth.reducer,
  personPage: personPage.reducer,
});

export const configureRoot = () => {
  return {
    reducer: rootReducer,
    saga: rootSaga,
  };
};
