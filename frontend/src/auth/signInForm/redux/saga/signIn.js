import { push } from "connected-react-router";
import { call, put, select, takeLeading } from "redux-saga/effects";
import firebase from "../../../firebase";
import actions from "../actions";
import { SignInMethod } from "../constants";
import selectors from "../selectors";

function* signInWithGoogleFlow() {
  yield put(actions.setStatus("loading"));
  try {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const values = yield select(selectors.values);
    if (values.email) {
      googleProvider.setCustomParameters({ login_hint: values.email });
    }
    const result = yield call(() =>
      firebase.auth().signInWithPopup(googleProvider)
    );
    yield put(actions.signInSuccess(result));
  } catch (error) {
    yield put(actions.setError(error));
  } finally {
    yield put(actions.setStatus(null));
  }
}

function* signInWithEmailAndPasswordFlow(action) {
  yield put(actions.setStatus("loading"));
  try {
    const { email, password } = action.payload;
    const result = yield call(() =>
      firebase.auth().signInWithEmailAndPassword(email, password)
    );
    yield put(actions.signInSuccess(result));
  } catch (error) {
    yield put(actions.setError(error));
  } finally {
    yield put(actions.setStatus(null));
  }
}

function* signInFlow(action) {
  yield put(actions.setError(null));
  switch (action.payload.method) {
    case SignInMethod.Google:
      yield* signInWithGoogleFlow(action);
      break;
    case SignInMethod.Password:
      yield* signInWithEmailAndPasswordFlow(action);
      break;
  }
}

function* registerFlow(action) {
  yield put(actions.setStatus("loading"));
  try {
    const { email, password, ...profileData } = action.payload;
    const result = yield call(() =>
      firebase.auth().createUserWithEmailAndPassword(email, password)
    );
    yield call(() => result.user.updateProfile(profileData));
    yield put(actions.signInSuccess(result));
  } catch (error) {
    yield put(actions.setError(error));
  } finally {
    yield put(actions.setStatus(null));
  }
}

function* signInSuccessFlow(action) {
  const user = action.payload.user;
  const idToken = yield call(() => user.getIdToken());
  yield put(actions.reset());
  yield put(push("/account"));
}

export default function* () {
  yield takeLeading(actions.register, registerFlow);
  yield takeLeading(actions.signIn, signInFlow);
  yield takeLeading(actions.signInSuccess, signInSuccessFlow);
}
