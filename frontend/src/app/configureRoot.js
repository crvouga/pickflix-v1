import { combineReducers } from "@reduxjs/toolkit";
import { firebaseReducer } from "react-redux-firebase";
import { persistReducer } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage";
import { fork } from "redux-saga/effects";
import signIn from "../auth/signIn/redux/signIn";
import chat from "../chat/redux/chat";
import modal from "../common/redux/modal";
import discover from "../discover/redux/discover";
import player from "../video/redux/player";
import { connectRouter } from "connected-react-router";

const persistFirebaseReducer = persistReducer(
  { key: "firebaseState", storage, stateReconciler: hardSet },
  firebaseReducer
);

function* saga() {
  yield fork(player.saga);
  yield fork(discover.saga);
  yield fork(chat.saga);
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
  });

  return {
    reducer,
    saga,
  };
};
