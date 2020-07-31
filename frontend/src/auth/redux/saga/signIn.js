import { push } from "connected-react-router";
import { call, put, takeEvery } from "redux-saga/effects";
import firebase from "../../firebase";
import actions from "../actions";
import constants from "../constants";

const { Method } = constants;

function* signInWithEmailAndPassword(action) {
  const { email, password } = action.payload;
  try {
    const result = yield call(() =>
      firebase.auth().signInWithEmailAndPassword(email, password)
    );
    yield put(actions.signInSuccess(result));
  } catch (error) {
    console.log(error);
    if (error.code === "auth/wrong-password") {
      yield put(
        actions.setFormErrors({ password: { message: error.message } })
      );
    }
  }
}

function* signInWithGoogle() {
  const result = yield call(() =>
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  );
  yield put(actions.signInSuccess(result));
}

export default function* () {
  yield takeEvery(actions.signIn, function* (action) {
    const { method } = action.payload;
    switch (method) {
      case Method.Google:
        yield* signInWithGoogle();
      case Method.Password:
        yield* signInWithEmailAndPassword(action);
    }
  });

  yield takeEvery(actions.signInSuccess, function* (action) {
    yield put(push("/account"));
  });
}
