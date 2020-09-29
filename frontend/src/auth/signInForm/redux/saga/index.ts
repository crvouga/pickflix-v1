import { fork } from "redux-saga/effects";
import step from "./step";
import submit from "./submit";

export default function* () {
  yield* [fork(step), fork(submit)];
}
