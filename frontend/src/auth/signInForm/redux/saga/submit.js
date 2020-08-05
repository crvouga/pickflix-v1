import { push } from "connected-react-router";
import { call, put, takeLeading } from "redux-saga/effects";
import firebase from "../../../firebase";
import auth from "../../../redux";
import actions from "../actions";
import { SignInMethod } from "../constants";

function* submitFlow(action) {
  yield put(actions.setError(null));
  yield put(actions.setStatus("loading"));
  try {
    const signInMethod = action.payload.signInMethod;
    if (SignInMethod.Google === signInMethod) {
      const customParameters = action.payload.customParameters || {};
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      googleProvider.setCustomParameters(customParameters);
      const result = yield call(() =>
        firebase.auth().signInWithPopup(googleProvider)
      );
      yield put(actions.submitSuccess(result));
    }
    if (SignInMethod.Password === signInMethod) {
      const { email, password } = action.payload;
      const result = yield call(() =>
        firebase.auth().signInWithEmailAndPassword(email, password)
      );
      yield put(actions.submitSuccess(result));
    }
  } catch (error) {
    yield put(actions.setError(error));
  } finally {
    yield put(actions.setStatus(null));
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
    yield put(actions.submitSuccess(result));
  } catch (error) {
    yield put(actions.setError(error));
  } finally {
    yield put(actions.setStatus(null));
  }
}

function* submitSuccessFlow(action) {
  try {
    const idToken = yield call(() => action.payload.user.getIdToken());
    yield put(auth.actions.signIn({ idToken }));
    yield put(actions.reset());
    yield put(push("/account"));
    yield call(() => firebase.auth().signOut());
  } catch (error) {
    yield put(actions.setError(error));
  }
}

export default function* () {
  yield takeLeading(actions.register, registerFlow);
  yield takeLeading(actions.submit, submitFlow);
  yield takeLeading(actions.submitSuccess, submitSuccessFlow);
}
