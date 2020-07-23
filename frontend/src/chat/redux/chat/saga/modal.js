import { push } from "connected-react-router";
import { put, select, takeEvery } from "redux-saga/effects";
import modal from "../../../../common/redux/modal";

export default function* () {
  yield takeEvery(push().type, function* (action) {
    console.log(action);
    const isChatOpen = yield select(modal.selectors.isOpen("chat"));
    if (isChatOpen) {
      yield put(modal.actions.close("chat"));
    }
  });
}
