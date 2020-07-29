import * as R from "ramda";
import { call, fork, put, select } from "redux-saga/effects";
import api from "../../../api";
import actions from "../actions";
import * as selectors from "../selectors";

const fetchGenres = () => api.get("/api/tmdb/genre/movie/list");

function* initializeOptions() {
  const response = yield call(fetchGenres);
  const options = yield select(selectors.options);
  const newOptions = R.mergeWith(R.union, options, {
    genre: response.data.genres,
  });
  yield put(actions.setOptions(newOptions));
}

export default function* () {
  yield fork(initializeOptions);
}
