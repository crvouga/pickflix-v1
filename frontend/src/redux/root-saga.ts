import { REHYDRATE } from "redux-persist";
import { select, spawn, take } from "redux-saga/effects";
import { discoverMovieSaga } from "../discover/redux/discover-saga";
import { snackbarSaga } from "../snackbar/redux/snackbar-saga";
import { AppState } from "./types";

export function* rootSaga() {
  yield take(REHYDRATE);

  yield* [spawn(snackbarSaga), spawn(discoverMovieSaga)];
}
