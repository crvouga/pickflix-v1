import { eventChannel } from "redux-saga";
import { call, put, takeEvery, takeLeading } from "redux-saga/effects";
import { actions } from "../../redux";
import firebase from "../firebase";

const deleteCurrentUser = () => firebase.auth().currentUser.delete();
const signOut = () => firebase.auth().signOut();

const authStateChannel = eventChannel((emit) =>
  firebase.auth().onAuthStateChanged((user) => emit(user || false))
);

export default function* () {
  yield put(actions.auth.setError(null));

  yield takeEvery(authStateChannel, function* (user) {
    yield put(actions.auth.setUser(user));
  });

  yield takeEvery(actions.auth.signInSuccess, function* () {});

  yield takeLeading(actions.auth.signOut, function* () {
    yield call(signOut);
  });

  yield takeLeading(actions.auth.deleteUser, function* () {
    try {
      yield put(actions.auth.setError(null));
      yield put(actions.auth.setStatus("loading"));
      yield call(deleteCurrentUser);
    } catch (error) {
      yield put(actions.auth.setError(error));
    } finally {
      yield put(actions.auth.setStatus(null));
    }
  });
}
