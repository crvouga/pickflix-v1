import * as R from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";

import * as actions from "../actions";
import * as selectors from "../selectors";
import { Tag } from "../types";

const rangeStep = (start: number, step: number, end: number): number[] =>
  R.unfold((n) => (n > end ? false : [n, n + step]), start);

const decades = rangeStep(1940, 10, new Date().getFullYear());

const dateRangeTags: Tag[] = decades.map((year) => ({
  type: "dateRange",
  year,
  range: [year, year + 9],
  name: `${year}s`,
  id: year,
}));

export default function* () {
  yield takeEvery(actions.addTags, function* (action) {
    const oldTags = yield select(selectors.tags);
    const tags = action.payload;
    const newTags = R.concat(tags, oldTags);
    yield put(actions.setTags(newTags));
  });

  yield takeEvery(actions.subtractTags, function* (action) {
    const oldTags = yield select(selectors.tags);
    const tags = action.payload;
    const newTags = R.difference(oldTags, tags);
    yield put(actions.setTags(newTags));
  });

  yield put(actions.addTags(dateRangeTags));
}
