import { eventChannel } from "redux-saga";
import { fork, take, call, put, takeLeading } from "redux-saga/effects";
import firebase from "../firebase";
import actions from "./actions";

const authStateChannel = eventChannel((emit) =>
  firebase.auth().onAuthStateChanged((user) => emit(user || false))
);

export default function* () {
  yield put(actions.setError(null));

  yield fork(function* () {
    while (true) {
      const user = yield take(authStateChannel);
      yield put(actions.setUser(user));
    }
  });

  // yield takeLeading(actions.signIn, function* (action) {});

  yield takeLeading(actions.signOut, function* () {
    yield call(() => firebase.auth().signOut());
  });

  yield takeLeading(actions.deleteUser, function* () {
    try {
      yield put(actions.setError(null));
      yield put(actions.setStatus("loading"));
      const currentUser = firebase.auth().currentUser;
      yield call(() => currentUser.delete());
    } catch (error) {
      yield put(actions.setError(error));
    } finally {
      yield put(actions.setStatus(null));
    }
  });
}
