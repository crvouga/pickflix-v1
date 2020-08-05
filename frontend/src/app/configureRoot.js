import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { spawn } from "redux-saga/effects";
import auth from "../auth/redux";
import chat from "../chat/redux/chat";
import modal from "../common/redux/modal";
import recentlyViewed from "../common/redux/recentlyViewed";
import discover from "../discover/redux";
import search from "../search/redux";
import player from "../video/redux/player";
import signInForm from "../auth/signInForm/redux";
import cast from "../video/redux/cast";

function* saga() {
  yield* [
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

export default (history) => {
  const reducer = combineReducers({
    router: connectRouter(history),
    player: player.reducer,
    modal: modal.reducer,
    discover: discover.reducer,
    chat: chat.reducer,
    search: search.reducer,
    recentlyViewed: recentlyViewed.reducer,
    [signInForm.namespace]: signInForm.reducer,
    auth: auth.reducer,
    [cast.namespace]: cast.reducer,
  });

  return {
    reducer,
    saga,
  };
};
