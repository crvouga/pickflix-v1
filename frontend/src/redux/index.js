import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { spawn } from "redux-saga/effects";
import auth from "../auth/redux";
import signInForm from "../auth/signInForm/redux";
import chat from "../chat/redux/chat";
import modal from "../common/redux/modal";
import recentlyViewed from "../common/redux/recentlyViewed";
import router from "../common/redux/router";
import discover from "../discover/redux";
import lists from "../lists/redux";
import search from "../search/redux";
import cast from "../video/redux/cast";
import player from "../video/redux/player";
import snackbar from "../snackbar/redux";
import query from "./query";

export const actions = {
  [query.namespace]: query.actions,
  lists: lists.actions,
  player: player.actions,
  discover: discover.actions,
  chat: chat.actions,
  modal: modal.actions,
  search: search.actions,
  router: router.actions,
  recentlyViewed: recentlyViewed.actions,
  auth: auth.actions,
  signInForm: signInForm.actions,
  cast: cast.actions,
  snackbar: snackbar.actions,
};

export const selectors = {
  snackbar: snackbar.selectors,
  lists: lists.selectors,
  player: player.selectors,
  discover: discover.selectors,
  chat: chat.selectors,
  modal: modal.selectors,
  search: search.selectors,
  recentlyViewed: recentlyViewed.selectors,
  auth: auth.selectors,
  signInForm: signInForm.selectors,
  cast: cast.selectors,
  router: router.selectors,
  [query.namespace]: query.selectors,
};

function* rootSaga() {
  yield* [
    spawn(snackbar.saga),
    spawn(lists.saga),
    spawn(player.saga),
    spawn(discover.saga),
    spawn(chat.saga),
    spawn(modal.saga),
    spawn(search.saga),
    spawn(recentlyViewed.saga),
    spawn(auth.saga),
    spawn(signInForm.saga),
    spawn(cast.saga),
  ];
}

export const configureRoot = (history) => {
  const reducers = {
    snackbar: snackbar.reducer,
    router: connectRouter(history),
    lists: lists.reducer,
    player: player.reducer,
    modal: modal.reducer,
    discover: discover.reducer,
    chat: chat.reducer,
    search: search.reducer,
    recentlyViewed: recentlyViewed.reducer,
    signInForm: signInForm.reducer,
    auth: auth.reducer,
    cast: cast.reducer,
    [query.namespace]: query.reducer,
  };

  const rootReducer = combineReducers(reducers);

  return {
    reducer: rootReducer,
    saga: rootSaga,
  };
};
