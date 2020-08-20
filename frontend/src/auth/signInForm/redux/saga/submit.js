import { call, put, takeLeading } from "redux-saga/effects";
import { actions } from "../../../../redux";
import firebase from "../../../firebase";
import { SignInMethod } from "../constants";

const signInWithPopup = (provider) => firebase.auth().signInWithPopup(provider);

const signInWithEmailAndPassword = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

const createUserWithEmailAndPassword = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

const updateProfile = (user, profileData) => user.updateProfile(profileData);

function* submitFlow(action) {
  yield put(actions.signInForm.setError(null));
  yield put(actions.signInForm.setStatus("loading"));
  try {
    const signInMethod = action.payload.signInMethod;

    if (SignInMethod.Google === signInMethod) {
      const customParameters = action.payload.customParameters || {};
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      googleProvider.setCustomParameters(customParameters);
      const result = yield call(signInWithPopup, googleProvider);
      yield put(actions.signInForm.submitSuccess(result));
    }

    if (SignInMethod.Password === signInMethod) {
      const { email, password } = action.payload;
      const result = yield call(signInWithEmailAndPassword, email, password);
      yield put(actions.signInForm.submitSuccess(result));
    }
  } catch (error) {
    yield put(actions.signInForm.setError(error));
  } finally {
    yield put(actions.signInForm.setStatus(null));
  }
}

function* registerFlow(action) {
  yield put(actions.signInForm.setStatus("loading"));
  try {
    const { email, password, ...profileData } = action.payload;
    const result = yield call(createUserWithEmailAndPassword, email, password);
    yield call(updateProfile, result.user, profileData);
    yield put(actions.signInForm.submitSuccess(result));
  } catch (error) {
    yield put(actions.signInForm.setError(error));
  } finally {
    yield put(actions.signInForm.setStatus(null));
  }
}

function* submitSuccessFlow() {
  yield put(actions.signInForm.reset());
  yield put(actions.auth.signInSuccess());
}

export default function* () {
  yield takeLeading(actions.signInForm.register, registerFlow);
  yield takeLeading(actions.signInForm.submit, submitFlow);
  yield takeLeading(actions.signInForm.submitSuccess, submitSuccessFlow);
}
