import {
  call,
  fork,
  put,
  select,
  takeEvery,
  takeLeading,
} from "redux-saga/effects";
import { auth } from "./auth";
import { history } from "../../navigation/history";
import { snackbar } from "../../snackbar/redux/snackbar";
import firebase from "../firebase";
import authStateChangedSaga from "./auth-state-changed-saga";

const deleteCurrentUser = () => firebase.auth().currentUser?.delete();

function* deleteUserSaga() {
  yield takeLeading(auth.actions.deleteUser, function* () {
    try {
      yield put(auth.actions.setError(undefined));
      yield put(auth.actions.setStatus("loading"));
      yield call(deleteCurrentUser);
    } catch (error) {
      yield put(auth.actions.setError(error));
    } finally {
      yield put(auth.actions.setStatus("success"));
    }
  });
}

function* signInSuccessSaga() {
  yield takeEvery(auth.actions.signInSuccess, function* () {
    yield call(() => history.push("/"));
  });
}

const signOut = () => firebase.auth().signOut();

function* signOutSaga() {
  yield takeEvery(auth.actions.signOut, function* () {
    yield call(signOut);
  });
}

export function* authSaga() {
  yield put(auth.actions.setAuthStatus("loading"));
  yield put(auth.actions.setError(undefined));

  yield takeEvery(auth.actions.signedIn, function* () {
    const currentUser = yield select(auth.selectors.user);
    yield put(
      snackbar.actions.display({
        message: `Signed as ${currentUser.displayName} (${currentUser.email})`,
      })
    );
  });

  yield takeEvery(auth.actions.signedOut, function* () {
    yield put(
      snackbar.actions.display({
        message: `You are now signed out`,
      })
    );
  });

  yield* [
    fork(authStateChangedSaga),
    fork(deleteUserSaga),
    fork(signInSuccessSaga),
    fork(signOutSaga),
  ];
}
