import { takeEvery, select, put } from "redux-saga/effects";
import modal from "../../common/redux/modal";
import actions from "./actions";

export default function* () {
  //pause player when video modal closes
  yield takeEvery(modal.actions.close, function* (action) {
    const name = action.payload.name;
    if (name === "video") {
      yield put(actions.pause());
    }
  });

  //ensure player is paused when modal is close
  yield takeEvery(actions.play, function* () {
    const isVideoOpen = yield select(modal.selectors.isOpen("video"));
    if (!isVideoOpen) {
      yield put(actions.pause());
    }
  });
}
