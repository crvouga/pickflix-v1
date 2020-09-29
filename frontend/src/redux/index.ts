import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { spawn } from "redux-saga/effects";
import auth from "../auth/redux";
import signInForm from "../auth/signInForm/redux";
import discover from "../discover/redux";
import lists from "../lists/redux";
import search from "../search/redux";
import snackbar from "../snackbar/redux";
import video from "../video/redux";
import query from "./query";
import recentlyViewed from "./recently-viewed";
import router from "./router";

export const actions = Object.freeze({
  lists: lists.actions,
  video: video.actions,
  discover: discover.actions,
  search: search.actions,
  router: router.actions,
  recentlyViewed: recentlyViewed.actions,
  auth: auth.actions,
  signInForm: signInForm.actions,
  snackbar: snackbar.actions,
  query: query.actions,
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
  router: router.selectors,
  query: query.selectors,
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

export const configureRoot = (history: History) => {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    snackbar: snackbar.reducer,
    lists: lists.reducer,
    video: video.reducer,
    discover: discover.reducer,
    search: search.reducer,
    recentlyViewed: recentlyViewed.reducer,
    signInForm: signInForm.reducer,
    auth: auth.reducer,
    query: query.reducer,
  });

  return {
    reducer: rootReducer,
    saga: rootSaga,
  };
};
