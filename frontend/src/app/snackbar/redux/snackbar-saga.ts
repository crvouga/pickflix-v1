import { delay, put, select, takeLatest } from "redux-saga/effects";
import { snackbar } from "./snackbar";

export const SNACKBAR_TRANSITION_DURATION = 200;
export const SNACKBAR_DISPLAY_DURATION = 3000;

export function* snackbarSaga() {
  yield put(snackbar.actions.setIsOpen(false));
  yield takeLatest(snackbar.actions.display, function* ({ payload: newProps }) {
    const isOpen: ReturnType<typeof snackbar.selectors.isOpen> = yield select(
      snackbar.selectors.isOpen
    );

    if (isOpen) {
      yield put(snackbar.actions.setIsOpen(false));
      yield delay(SNACKBAR_TRANSITION_DURATION);
    }
    yield put(snackbar.actions.setProps(newProps));
    yield put(snackbar.actions.setIsOpen(true));
    yield delay(SNACKBAR_DISPLAY_DURATION);
    yield put(snackbar.actions.setIsOpen(false));
  });
}
