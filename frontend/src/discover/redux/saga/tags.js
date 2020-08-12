import * as R from "ramda";
import { takeEvery, select, call, fork, put } from "redux-saga/effects";
import backendAPI from "../../../backendAPI";
import * as actions from "../actions";
import * as selectors from "../selectors";

const getGenres = async () => {
  const response = await backendAPI.get("/api/tmdb/genre/movie/list");
  return response.data.genres;
};

export default function* () {
  yield takeEvery(actions.addTags, function* (action) {
    const oldTags = yield select(selectors.tags);
    const tags = action.payload;
    const newTags = R.union(tags, oldTags);
    yield put(actions.setTags(newTags));
  });

  yield takeEvery(actions.subtractTags, function* (action) {
    const oldTags = yield select(selectors.tags);
    const tags = action.payload;
    const newTags = R.difference(oldTags, tags);
    yield put(actions.setTags(newTags));
  });

  const genres = yield call(getGenres);
  const genreTags = R.map(R.assoc("type", "genre"), genres);
  yield put(actions.addTags(genreTags));
}
