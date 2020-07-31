import { call, put, takeLeading } from "redux-saga/effects";
import firebase from "../../firebase";
import actions from "../actions";

export default function* () {
  yield takeLeading(actions.register, function* (action) {
    const { email, password, displayName } = action.payload;
    yield put(actions.setStatus("loading"));
    const result = yield call(() =>
      firebase.auth().createUserWithEmailAndPassword(email, password)
    );
    yield call(() => result.user.updateProfile({ displayName }));
    yield put(actions.setStatus());
    yield put(actions.signInSuccess());
  });
}
