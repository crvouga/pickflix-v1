import { delay, put, select, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as selectors from "./selectors";

const SNACKBAR_TIMEOUT = 4000;

export default function* () {
  yield put(actions.setOpen(false));

  yield takeLatest(actions.display, function* (action) {
    const snackbarProps = action.payload;
    if (yield select(selectors.open)) {
      yield put(actions.setOpen(false));
      yield delay(200);
    }
    yield put(actions.setSnackbarProps(snackbarProps));
    yield put(actions.setOpen(true));
    yield delay(SNACKBAR_TIMEOUT);
    yield put(actions.setOpen(false));
  });
}
