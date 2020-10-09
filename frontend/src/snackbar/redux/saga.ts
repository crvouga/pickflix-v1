import { delay, put, select, takeLatest } from "redux-saga/effects";

import { actions, selectors } from "../../redux";

const SNACKBAR_TIMEOUT = 4000;

export default function* () {
  yield put(actions.snackbar.setOpen(false));

  yield takeLatest(actions.snackbar.display, function* (action) {
    const snackbarProps = action.payload;

    if (yield select(selectors.snackbar.open)) {
      yield put(actions.snackbar.setOpen(false));
      yield delay(200);
    }

    yield put(actions.snackbar.setSnackbarProps(snackbarProps));
    yield put(actions.snackbar.setOpen(true));
    yield delay(SNACKBAR_TIMEOUT);
    yield put(actions.snackbar.setOpen(false));
  });
}
