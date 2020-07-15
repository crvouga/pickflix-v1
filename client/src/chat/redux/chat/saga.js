import { fork } from "redux-saga/effects";
import optionsSaga from "./optionsSaga";
import botSaga from "./botSaga";

export default function* () {
  yield fork(optionsSaga);
  yield fork(botSaga);
}
