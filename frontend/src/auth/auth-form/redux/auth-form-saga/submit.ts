import { User } from "firebase";
import { call, put, takeLeading } from "redux-saga/effects";
import firebase from "../../../firebase";
import { auth } from "../../../redux/auth";
import { authForm } from "../auth-form";
import { SignInMethod } from "../types";

const signInWithPopup = (provider: firebase.auth.AuthProvider) =>
  firebase.auth().signInWithPopup(provider);

const signInWithEmailAndPassword = (email: string, password: string) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

const createUserWithEmailAndPassword = (email: string, password: string) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

const updateProfile = (user: User, profileData: { [key: string]: string }) =>
  user.updateProfile(profileData);

function* submitFlow(action: any) {
  yield put(authForm.actions.setError(undefined));

  yield put(authForm.actions.setStatus("loading"));

  try {
    const signInMethod = action.payload.signInMethod;

    if (SignInMethod.Google === signInMethod) {
      const customParameters = action.payload.customParameters || {};
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      googleProvider.setCustomParameters(customParameters);
      const result: firebase.auth.UserCredential = yield call(
        signInWithPopup,
        googleProvider
      );
      yield put(authForm.actions.submitSuccess(result));
    }

    if (SignInMethod.Password === signInMethod) {
      const { email, password } = action.payload;
      const result: firebase.auth.UserCredential = yield call(
        signInWithEmailAndPassword,
        email,
        password
      );
      yield put(authForm.actions.submitSuccess(result));
    }
  } catch (error) {
    yield put(authForm.actions.setError(error));
  } finally {
    yield put(authForm.actions.setStatus("success"));
  }
}

function* registerFlow(action: any) {
  yield put(authForm.actions.setStatus("loading"));
  try {
    const { email, password, ...profileData } = action.payload;
    const result = yield call(createUserWithEmailAndPassword, email, password);
    yield call(updateProfile, result.user, profileData);
    yield put(authForm.actions.submitSuccess(result));
  } catch (error) {
    yield put(authForm.actions.setError(error));
  } finally {
    yield put(authForm.actions.setStatus("success"));
  }
}

function* submitSuccessFlow() {
  yield put(authForm.actions.reset());
  yield put(auth.actions.signInSuccess());
}

export default function* () {
  yield takeLeading(authForm.actions.register, registerFlow);
  yield takeLeading(authForm.actions.submit, submitFlow);
  yield takeLeading(authForm.actions.submitSuccess, submitSuccessFlow);
}
