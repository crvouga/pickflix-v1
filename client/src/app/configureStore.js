import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { fork, select, put, takeEvery } from "redux-saga/effects";
import player from "../video/redux/player";
import modal from "../common/redux/modal";

function* rootSaga() {
  yield takeEvery(player.actions.play, function* () {
    const isVideoModalOpen = yield select(modal.selectors.isOpen("videoModal"));
    if (!isVideoModalOpen) {
      yield put(player.actions.pause());
    }
  });
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
