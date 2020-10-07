import { User } from "firebase";
import { eventChannel } from "redux-saga";
import { put, select, takeEvery } from "redux-saga/effects";
import { actions, selectors } from "../../redux";
import firebase from "../firebase";
import { AuthStatus } from "./types";

// false for no user because redux saga doesn't like null values
const authStateChannel = eventChannel<User | false>((emit) => {
  return firebase.auth().onAuthStateChanged((user) => {
    emit(user || false);
  });
});

function* authStateChanged(newCurrentUser: User | false) {
  const previousAuthStatus: AuthStatus = yield select(
    selectors.auth.authStatus
  );

  yield put(actions.auth.setUser(newCurrentUser || undefined));
  yield put(
    actions.auth.setAuthStatus(newCurrentUser ? "signedIn" : "signedOut")
  );

  const currentAuthStatus: AuthStatus = yield select(selectors.auth.authStatus);
  const currentUser: User | undefined = yield select(selectors.auth.user);

  if (
    previousAuthStatus !== "signedIn" &&
    currentAuthStatus === "signedIn" &&
    currentUser
  ) {
    yield put(
      actions.snackbar.display({
        message: `Signed as ${currentUser.displayName} (${currentUser.email})`,
      })
    );
  }

  if (previousAuthStatus === "signedIn" && currentAuthStatus === "signedOut") {
    yield put(
      actions.snackbar.display({
        message: `You are now signed out`,
      })
    );
  }
}

export default function* () {
  yield takeEvery(authStateChannel, authStateChanged);
}
