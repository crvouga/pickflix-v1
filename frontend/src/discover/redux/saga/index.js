import { fork } from "redux-saga/effects";
import optionsSaga from "./options";
import resultsSaga from "./results";

export default function* () {
  yield fork(optionsSaga);
  yield fork(resultsSaga);
}
