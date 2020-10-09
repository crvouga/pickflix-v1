import { put, takeEvery } from "redux-saga/effects";
import { actions } from "../index";

export default function* () {
  yield takeEvery(actions.auth.signedOut, function* () {
    yield put(actions.recentlyViewed.clear());
  });
}
