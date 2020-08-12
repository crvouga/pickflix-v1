import * as R from "ramda";
import { takeEvery, select, call, fork, put } from "redux-saga/effects";
import backendAPI from "../../../backendAPI";
import * as actions from "../actions";
import * as selectors from "../selectors";

const getGenres = async () => {
  const response = await backendAPI.get("/api/tmdb/genre/movie/list");
  return response.data.genres;
};

const rangeStep = (start, step, end) =>
  R.unfold((n) => (n > end ? false : [n, n + step]), start);

const decades = rangeStep(1940, 10, new Date().getFullYear());

const dateRangeTags = decades.map((year) => ({
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

  // const genres = yield call(getGenres);
  // const genreTags = R.map(R.assoc("type", "genre"), genres);
  // yield put(actions.addTags(genreTags));
  yield put(actions.addTags(dateRangeTags));
}
