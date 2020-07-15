import actions from "./actions";
import { takeLeading } from "redux-saga/effects";
let previousScroll = 0;

export default function* () {
  yield takeLeading(actions.messageListScroll, function* (action) {});
}
