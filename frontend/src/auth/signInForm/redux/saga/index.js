import { fork } from "redux-saga/effects";
import stepSaga from "./step";
import signInSaga from "./signIn";

export default function* () {
  yield* [fork(stepSaga), fork(signInSaga)];
}
