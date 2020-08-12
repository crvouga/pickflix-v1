import { eventChannel } from "redux-saga";
import {
  takeEvery,
  fork,
  take,
  call,
  put,
  takeLeading,
} from "redux-saga/effects";
import firebase from "../firebase";
import actions from "./actions";

const deleteCurrentUser = () => firebase.auth().currentUser.delete();
const signOut = () => firebase.auth().signOut();

const authStateEventChannel = eventChannel((emit) =>
  firebase.auth().onAuthStateChanged((user) => emit(user || false))
);

export default function* () {
  yield put(actions.setError(null));

  yield takeEvery(authStateEventChannel, function* (user) {
    yield put(actions.setUser(user));
  });

  // yield takeLeading(actions.signIn, function* (action) {});

  yield takeLeading(actions.signOut, function* () {
    yield call(signOut);
  });

  yield takeLeading(actions.deleteUser, function* () {
    try {
      yield put(actions.setError(null));
      yield put(actions.setStatus("loading"));
      yield call(deleteCurrentUser);
    } catch (error) {
      yield put(actions.setError(error));
    } finally {
      yield put(actions.setStatus(null));
    }
  });
}
