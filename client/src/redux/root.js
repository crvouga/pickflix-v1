import { fork } from "redux-saga/effects";
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

const reducer = {
  player: player.reducer,
  modal: modal.reducer,
  discover: discover.reducer,
  chat: chat.reducer,
};

const selectors = {
  player: player.selectors,
  modal: modal.selectors,
  discover: discover.selectors,
  chat: chat.selectors,
};

function* saga() {
  yield fork(player.saga);
  yield fork(discover.saga);
  yield fork(chat.saga);
}

export default { reducer, saga, actions, selectors };
