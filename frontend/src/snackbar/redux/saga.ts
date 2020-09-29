import { delay, put, select, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as selectors from "./selectors";

export default function* saga() {
  yield takeLatest(actions.display, function* (action) {
    const snackbarProps = action.payload;
    if (yield select(selectors.open)) {
      yield put(actions.setOpen(false));
      yield delay(500);
    }
    yield put(actions.setSnackbarProps(snackbarProps));
    yield put(actions.setOpen(true));
    yield delay(5000);
    yield put(actions.setOpen(false));
  });
}
