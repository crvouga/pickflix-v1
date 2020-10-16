import { put, takeEvery } from "redux-saga/effects";
import { auth } from "../../auth/redux/auth";
import { history } from "./history";

export function* historySaga() {
  yield takeEvery(auth.actions.signedOut, function* () {
    yield put(history.actions.clear());
  });
}
