import * as R from "ramda";
import axios from "axios";
import {
  all,
  delay,
  takeLeading,
  cancelled,
  call,
  fork,
  put,
  select,
} from "redux-saga/effects";
import backendAPI from "../../../backendAPI";
import * as selectors from "../selectors";
import * as actions from "../actions";

const fetchGenres = () => backendAPI.get("/api/tmdb/genre/movie/list");

function* genresSaga() {
  const response = yield call(fetchGenres);
  const genres = response.data.genres;
  const genreTags = R.map(R.assoc("type", "genre"), genres);
  yield put(actions.newTags(genreTags));
}

const getPersonSearch = (config) =>
  backendAPI.get("/api/tmdb/search/person", config);

const getKeywordSearch = (config) =>
  backendAPI.get("/api/tmdb/search/keyword", config);

const getCompanySearch = (config) =>
  backendAPI.get("/api/tmdb/search/keyword", config);

function* searchTagsSaga() {
  yield takeLeading(actions.tagQueryChanged, function* (action) {
    yield delay(200);
    const tagQuery = action.payload;

    if (tagQuery.length === 0) {
      return;
    }

    const cancelSource = axios.CancelToken.source();

    try {
      const config = {
        cancelToken: cancelSource.token,
        params: {
          query: encodeURI(tagQuery),
        },
      };

      yield all([
        call(function* () {
          const response = yield call(getPersonSearch, config);
          const results = response.data.results;
          const tags = R.map(R.assoc("type", "person"), results);
          yield put(actions.newTags(tags));
        }),
        call(function* () {
          const response = yield call(getKeywordSearch, config);
          const results = response.data.results;
          const tags = R.map(R.assoc("type", "keyword"), results);
          yield put(actions.newTags(tags));
        }),
      ]);
    } catch (error) {
    } finally {
      if (yield cancelled()) {
        yield call(() => cancelSource.cancel());
      }
    }
  });
}

export default function* () {
  yield fork(genresSaga);
  yield fork(searchTagsSaga);
}
