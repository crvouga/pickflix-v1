import { delay, put, select, takeLatest } from "redux-saga/effects";
import { snackbar } from "./snackbar";

const SNACKBAR_TIMEOUT = 4000;

export function* snackbarSaga() {
  yield put(snackbar.actions.setOpen(false));
  yield takeLatest(snackbar.actions.display, function* (action) {
    const props = action.payload;
    if (yield select(snackbar.selectors.open)) {
      yield put(snackbar.actions.setOpen(false));
      yield delay(200);
    }
    yield put(snackbar.actions.setProps(props));
    yield put(snackbar.actions.setOpen(true));
    yield delay(SNACKBAR_TIMEOUT);
    yield put(snackbar.actions.setOpen(false));
  });
}
