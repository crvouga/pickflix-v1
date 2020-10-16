import { fork } from "redux-saga/effects";
import step from "./step";
import submit from "./submit";

export function* authFormSaga() {
  yield* [fork(step), fork(submit)];
}
