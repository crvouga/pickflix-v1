import * as R from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";

import * as actions from "../actions";
import * as selectors from "../selectors";

export default function* () {
  yield takeEvery(actions.activateTags, function* (action) {
    const tags = action.payload;
    const activeTags = yield select(selectors.activeTags);
    yield put(actions.setActiveTags(R.union(activeTags, tags)));
    yield put(actions.addTags(tags));
  });

  yield takeEvery(actions.deactivateTags, function* (action) {
    const tags = action.payload;
    const activeTags = yield select(selectors.activeTags);
    yield put(actions.setActiveTags(R.difference(activeTags, tags)));
  });
}
