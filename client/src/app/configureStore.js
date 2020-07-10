import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import player from "../video/redux/player";
import modal from "../common/redux/modal";

function* rootSaga() {
  yield fork(player.saga);
}

const rootReducer = {
  player: player.reducer,
  modal: modal.reducer,
};

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, ...getDefaultMiddleware()],
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
