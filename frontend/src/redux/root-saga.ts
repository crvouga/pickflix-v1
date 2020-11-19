import { REHYDRATE } from "redux-persist";
import { spawn, take } from "redux-saga/effects";
import { discoverMovieSaga } from "../discover/redux/discover-saga";
import { snackbarSaga } from "../snackbar/redux/snackbar-saga";

export function* rootSaga() {
  yield take(REHYDRATE);

  yield* [spawn(snackbarSaga), spawn(discoverMovieSaga)];
}
