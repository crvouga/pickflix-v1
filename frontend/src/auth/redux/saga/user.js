import { eventChannel } from "redux-saga";
import { put, take } from "redux-saga/effects";
import firebase from "../../firebase";
import actions from "../actions";

const authStateChannel = eventChannel((emit) => {
  return firebase.auth().onAuthStateChanged((user) => {
    emit(user || false);
  });
});

export default function* () {
  while (true) {
    const user = yield take(authStateChannel);
    yield put(actions.setUser(user));
  }
}
