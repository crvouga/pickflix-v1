import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { firebaseReducer } from "react-redux-firebase";
import { persistReducer } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage";
import { spawn } from "redux-saga/effects";
import signIn from "../auth/signIn/redux/signIn";
import chat from "../chat/redux/chat";
import modal from "../common/redux/modal";
import discover from "../discover/redux/discover";
import search from "../search/redux";
import player from "../video/redux/player";

const persistFirebaseReducer = persistReducer(
  { key: "firebaseState", storage, stateReconciler: hardSet },
  firebaseReducer
);

function* saga() {
  yield* [
    spawn(player.saga),
    spawn(discover.saga),
    spawn(chat.saga),
    spawn(modal.saga),
    spawn(search.saga),
  ];
}

export default (history) => {
  const reducer = combineReducers({
    router: connectRouter(history),
    firebase: persistFirebaseReducer,
    player: player.reducer,
    modal: modal.reducer,
    discover: discover.reducer,
    chat: chat.reducer,
    signIn: signIn.reducer,
    search: search.reducer,
  });

  return {
    reducer,
    saga,
  };
};
