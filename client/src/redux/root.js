import { combineReducers } from "@reduxjs/toolkit";
import { fork, put, select, takeEvery } from "redux-saga/effects";
import chat from "../chat/redux/chat";
import modal from "../common/redux/modal";
import discover from "../discover/redux/discover";
import player from "../video/redux/player";

const actions = {
  player: player.actions,
  modal: modal.actions,
  discover: discover.actions,
  chat: chat.actions,
};

const reducer = combineReducers({
  player: player.reducer,
  modal: modal.reducer,
  discover: discover.reducer,
  chat: chat.reducer,
});

const selectors = {
  player: player.selectors,
  modal: modal.selectors,
  discover: discover.selectors,
  chat: chat.selectors,
};

function* saga() {
  // ensure player is not playing when modal is not open
  yield takeEvery(player.actions.play, function* () {
    const isVideoModalOpen = yield select(modal.selectors.isOpen("videoModal"));
    if (!isVideoModalOpen) {
      yield put(player.actions.pause());
    }
  });
  yield fork(player.saga);
  yield fork(discover.saga);
  yield fork(chat.saga);
}

export default { reducer, saga, actions, selectors };
