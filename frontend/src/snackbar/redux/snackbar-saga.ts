import { takeLatest, select, put, delay } from "redux-saga/effects";
import { snackbar } from "./snackbar";

export const SNACKBAR_TRANSITION_DURATION = 200;
export const SNACKBAR_DISPLAY_DURATION = 3000;

export function* snackbarSaga() {
  yield put(snackbar.actions.setIsOpen(false));
  yield takeLatest(snackbar.actions.display, function* ({ payload: newProps }) {
    if (yield select(snackbar.selectors.isOpen)) {
      yield put(snackbar.actions.setIsOpen(false));
      yield delay(SNACKBAR_TRANSITION_DURATION);
    }
    yield put(snackbar.actions.setProps(newProps));
    yield put(snackbar.actions.setIsOpen(true));
    yield delay(SNACKBAR_DISPLAY_DURATION);
    yield put(snackbar.actions.setIsOpen(false));
  });
}
