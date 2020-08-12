import { fork } from "redux-saga/effects";
import searchResponses from "./search";
import discoverResponses from "./discoverResponses";
import activeTags from "./activeTags";
import tags from "./tags";

export default function* () {
  yield* [
    fork(activeTags),
    fork(searchResponses),
    fork(discoverResponses),
    fork(tags),
  ];
}
