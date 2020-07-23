import { fork } from "redux-saga/effects";
import optionsSaga from "./options";
import botSaga from "./bot";
import modalSaga from "./modal";

export default function* () {
  yield fork(optionsSaga);
  yield fork(botSaga);
  yield fork(modalSaga);
}
