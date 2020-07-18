import { fork } from "redux-saga/effects";
import chat from "../../chat/redux/chat";
import modal from "../../common/redux/modal";
import discover from "../../discover/redux/discover";
import player from "../../video/redux/player";

const reducer = {
  player: player.reducer,
  modal: modal.reducer,
  discover: discover.reducer,
  chat: chat.reducer,
};

function* saga() {
  yield fork(player.saga);
  yield fork(discover.saga);
  yield fork(chat.saga);
}

export default { reducer, saga };
