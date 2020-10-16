import { User } from "firebase";
import { put, select, takeEvery } from "redux-saga/effects";
import { auth } from "./auth";
import authStateChannel from "./auth-state-channel";
import { AuthStatus } from "./types";

function* authStateChangedSaga(newCurrentUser: User | false) {
  const previousAuthStatus: AuthStatus = yield select(
    auth.selectors.authStatus
  );
  const perviousCurrentUser: User | undefined = yield select(
    auth.selectors.user
  );

  if (newCurrentUser) {
    yield put(auth.actions.setUser(newCurrentUser));
    yield put(auth.actions.setAuthStatus("signedIn"));
  } else {
    yield put(auth.actions.setUser(undefined));
    yield put(auth.actions.setAuthStatus("signedOut"));
  }

  const currentAuthStatus: AuthStatus = yield select(auth.selectors.authStatus);
  const currentUser: User | undefined = yield select(auth.selectors.user);

  const didSignedIn =
    previousAuthStatus !== "signedIn" &&
    currentAuthStatus === "signedIn" &&
    currentUser;

  const didSwapSignIn =
    perviousCurrentUser &&
    currentUser &&
    perviousCurrentUser.uid !== currentUser.uid;

  if (didSignedIn || didSwapSignIn) {
    yield put(auth.actions.signedIn());
  }

  const didSignOut =
    previousAuthStatus === "signedIn" && currentAuthStatus === "signedOut";

  if (didSignOut) {
    yield put(auth.actions.signedOut());
  }
}

export default function* () {
  yield takeEvery(authStateChannel, authStateChangedSaga);
}
