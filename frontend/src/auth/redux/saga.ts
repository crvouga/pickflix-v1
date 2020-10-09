import {
  select,
  call,
  fork,
  put,
  takeEvery,
  takeLeading,
} from "redux-saga/effects";
import { actions, selectors } from "../../redux";
import firebase from "../firebase";
import authStateChangedSaga from "./auth-state-changed-saga";
import { history } from "../../navigation/history";

const deleteCurrentUser = () => firebase.auth().currentUser?.delete();

function* deleteUserSaga() {
  yield takeLeading(actions.auth.deleteUser, function* () {
    try {
      yield put(actions.auth.setError(undefined));
      yield put(actions.auth.setStatus("loading"));
      yield call(deleteCurrentUser);
    } catch (error) {
      yield put(actions.auth.setError(error));
    } finally {
      yield put(actions.auth.setStatus("success"));
    }
  });
}

function* signInSuccessSaga() {
  yield takeEvery(actions.auth.signInSuccess, function* () {
    yield call(() => history.push("/"));
  });
}

const signOut = () => firebase.auth().signOut();

function* signOutSaga() {
  yield takeEvery(actions.auth.signOut, function* () {
    yield call(signOut);
  });
}

export default function* () {
  yield put(actions.auth.setAuthStatus("loading"));
  yield put(actions.auth.setError(undefined));

  yield takeEvery(actions.auth.signedIn, function* () {
    const currentUser = yield select(selectors.auth.user);
    yield put(
      actions.snackbar.display({
        message: `Signed as ${currentUser.displayName} (${currentUser.email})`,
      })
    );
  });

  yield takeEvery(actions.auth.signedOut, function* () {
    yield put(
      actions.snackbar.display({
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
