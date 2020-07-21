import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { firebaseReducer } from "react-redux-firebase";
import { persistReducer, persistStore } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import chat from "../chat/redux/chat";
import modal from "../common/redux/modal";
import discover from "../discover/redux/discover";
import player from "../video/redux/player";
import signIn from "../auth/signIn/redux/signIn";

const persistFirebaseReducer = persistReducer(
  { key: "firebaseState", storage, stateReconciler: hardSet },
  firebaseReducer
);

const rootReducer = combineReducers({
  firebase: persistFirebaseReducer,
  player: player.reducer,
  modal: modal.reducer,
  discover: discover.reducer,
  chat: chat.reducer,
  signIn: signIn.reducer,
});

function* saga() {
  yield fork(player.saga);
  yield fork(discover.saga);
  yield fork(chat.saga);
}

const persistConfig = {
  key: "root",
  storage,
};

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(saga);
  const persistor = persistStore(store);

  return { store, persistor };
};
