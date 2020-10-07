import { call, fork, put, takeEvery, takeLeading } from "redux-saga/effects";
import { actions } from "../../redux";
import firebase from "../firebase";
import authStateChangedSaga from "./auth-state-changed-saga";

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
    yield put(actions.router.push({ pathname: "/" }));
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
  yield* [
    fork(authStateChangedSaga),
    fork(deleteUserSaga),
    fork(signInSuccessSaga),
    fork(signOutSaga),
  ];
}
