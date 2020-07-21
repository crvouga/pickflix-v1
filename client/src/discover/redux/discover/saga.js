import * as selectors from "./selectors";
import actions from "./actions";
import { takeEvery, call, fork, put, select } from "redux-saga/effects";
import api from "../../../api";
import * as R from "ramda";

const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj)
  )
);

const fetchGenres = () => api.get("/api/tmdb/genre/movie/list");

function* fetchInitialSuggestions() {
  const response = yield call(fetchGenres);
  const genres = R.map(R.assoc("type", "genre"), response.data.genres);
  const chips = yield select(selectors.chips);
  const newChips = R.union(chips, genres);
  yield put(actions.setSuggestions(newChips));
}

export default function* () {
  yield fork(fetchInitialSuggestions);
  yield takeEvery(actions.setChips, function* () {});
}
