import { fork } from "redux-saga/effects";
import search from "./search";
import responses from "./responses";
import activeTags from "./activeTags";
import tags from "./tags";

export default function* () {
  yield* [fork(activeTags), fork(search), fork(responses), fork(tags)];
}
