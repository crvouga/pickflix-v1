import { delay, put, select, takeLatest } from "redux-saga/effects";
import { snackbar } from "./snackbar";

const SNACKBAR_TIMEOUT = 4000;

const { setIsOpen, display, setProps } = snackbar.actions;
const { isOpen } = snackbar.selectors;

export function* snackbarSaga() {
  yield put(setIsOpen(false));
  yield takeLatest(display, function* ({ payload: newProps }) {
    if (yield select(isOpen)) {
      yield put(setIsOpen(false));
      yield delay(200);
    }
    yield put(setProps(newProps));
    yield put(setIsOpen(true));
    yield delay(SNACKBAR_TIMEOUT);
    yield put(setIsOpen(false));
  });
}
