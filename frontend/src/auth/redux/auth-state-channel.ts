import { User } from "firebase";
import { eventChannel } from "redux-saga";
import firebase from "../firebase";

export default eventChannel<User | false>((emit) => {
  return firebase.auth().onAuthStateChanged((user) => {
    emit(user || false);
  });
});
