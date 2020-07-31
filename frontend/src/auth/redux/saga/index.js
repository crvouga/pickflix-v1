import { fork } from "redux-saga/effects";
import formSaga from "./form";
import registerSaga from "./register";
import signInSaga from "./signIn";
import userSaga from "./user";

export default function* () {
  yield* [fork(formSaga), fork(registerSaga), fork(signInSaga), fork(userSaga)];
}
