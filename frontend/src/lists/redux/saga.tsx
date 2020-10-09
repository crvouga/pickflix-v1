import { spawn } from "redux-saga/effects";
import querySaga from "./query-saga";

export default function* () {
  yield* [spawn(querySaga)];
}
