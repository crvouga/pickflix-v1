import { fork } from "redux-saga/effects";
import newTagsSaga from "./newTags";
import resultsSaga from "./results";

export default function* () {
  yield fork(newTagsSaga);
  yield fork(resultsSaga);
}
