import { eventChannel } from "redux-saga";
import {
  take,
  select,
  call,
  put,
  takeEvery,
  takeLeading,
} from "redux-saga/effects";
import { actions, selectors } from "../../redux";
import firebase from "../firebase";
import { User } from "firebase";

const deleteCurrentUser = () => firebase.auth().currentUser?.delete();

const signOut = () => firebase.auth().signOut();

// false for no user because redux saga doesn't like null values
const authStateChannel = eventChannel<User | false>((emit) => {
  return firebase.auth().onAuthStateChanged((user) => {
    emit(user || false);
  });
});

export default function* () {
  yield put(actions.auth.setAuthStatus("loading"));

  yield put(actions.auth.setError(undefined));

  yield takeEvery(authStateChannel, function* (newCurrentUser) {
    const currentAuthStatus = yield select(selectors.auth.authStatus);

    if (currentAuthStatus === "signedOut" && newCurrentUser) {
      yield put(
        actions.snackbar.display({
          message: `Signed as ${newCurrentUser.displayName} (${newCurrentUser.email})`,
        })
      );
    }

    if (currentAuthStatus === "signedIn" && !newCurrentUser) {
      yield put(
        actions.snackbar.display({
          message: `You are now signed out`,
        })
      );
    }

    yield put(actions.auth.setUser(newCurrentUser || undefined));
    yield put(
      actions.auth.setAuthStatus(newCurrentUser ? "signedIn" : "signedOut")
    );
  });

  yield takeEvery(actions.auth.signInSuccess, function* () {
    yield put(actions.router.push({ pathname: "/" }));
  });

  yield takeLeading(actions.auth.signOut, function* () {
    yield call(signOut);
  });

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
