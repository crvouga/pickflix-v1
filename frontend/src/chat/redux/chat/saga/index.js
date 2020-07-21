import { fork } from "redux-saga/effects";
import optionsSaga from "./options";
import botSaga from "./bot";

export default function* () {
  yield fork(optionsSaga);
  yield fork(botSaga);
}
