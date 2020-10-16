import { REHYDRATE } from "redux-persist";
import { spawn, take } from "redux-saga/effects";
import { authFormSaga } from "../auth/auth-form/redux/auth-form-saga";
import { authSaga } from "../auth/redux/auth-saga";
import { discoverMovieSaga } from "../discover/redux/discover-movie-saga";
import { historySaga } from "../navigation/history/history-saga";
import { querySaga } from "../query/query-saga";
import { snackbarSaga } from "../snackbar/redux/snackbar-saga";

export function* rootSaga() {
  yield take(REHYDRATE);

  yield* [
    spawn(authSaga),
    spawn(authFormSaga),
    spawn(snackbarSaga),
    spawn(historySaga),
    spawn(querySaga),
    spawn(discoverMovieSaga),
  ];
}
