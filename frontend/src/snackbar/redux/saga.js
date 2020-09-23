import { delay, put, select, takeLatest } from "redux-saga/effects";
import { actions, selectors } from "../../redux";

export default function* saga() {
  yield takeLatest(actions.snackbar.notify, function* (action) {
    if (yield select(selectors.snackbar.isOpen)) {
      yield put(actions.snackbar.setIsOpen(false));
      yield delay(500);
    }
    yield put(actions.snackbar.setInfo(action.payload));
    yield put(actions.snackbar.setIsOpen(true));
    yield delay(5000);
    yield put(actions.snackbar.setIsOpen(false));
  });
}
