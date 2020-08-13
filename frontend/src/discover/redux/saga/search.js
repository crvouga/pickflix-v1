import {
  all,
  cancelled,
  call,
  delay,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";
import backendAPI from "../../../backendAPI";
import * as actions from "../actions";
import * as selectors from "../selectors";
import * as R from "ramda";

const getSearchPerson = async (config) => {
  const response = await backendAPI.get("/api/tmdb/search/person", config);
  return response.data;
};

const getSearchKeyword = async (config) => {
  const response = await backendAPI.get("/api/tmdb/search/keyword", config);
  return response.data;
};

const getSearchCompany = async (config) => {
  const response = await backendAPI.get("/api/tmdb/search/company", config);
  return response.data;
};

export default function* () {
  yield takeLatest(actions.setSearchText, function* () {
    yield delay(200);
    const searchText = yield select(selectors.searchText);
    if (searchText.length === 0) {
      return;
    }
    yield put(actions.setSearchResults([]));

    const cancelSource = axios.CancelToken.source();
    const config = {
      cancelToken: cancelSource.token,
      params: {
        query: encodeURI(searchText),
      },
    };

    yield put(actions.setSearchStatus("loading"));

    try {
      yield all([
        call(function* () {
          const response = yield call(getSearchPerson, config);
          const results = R.map(R.assoc("type", "person"), response.results);
          const searchResults = yield select(selectors.searchResults);

          yield put(
            actions.setSearchResults(
              R.unionWith(R.prop("id"), results, searchResults)
            )
          );
        }),
        call(function* () {
          const response = yield call(getSearchCompany, config);
          const results = R.map(R.assoc("type", "company"), response.results);
          const searchResults = yield select(selectors.searchResults);
          yield put(
            actions.setSearchResults(
              R.unionWith(R.prop("id"), results, searchResults)
            )
          );
        }),

        call(function* () {
          const response = yield call(getSearchKeyword, config);
          const results = R.map(R.assoc("type", "keyword"), response.results);
          const searchResults = yield select(selectors.searchResults);
          yield put(
            actions.setSearchResults(
              R.unionWith(R.prop("id"), results, searchResults)
            )
          );
        }),
      ]);
      yield put(actions.setSearchStatus("success"));
    } catch (error) {
    } finally {
      if (yield cancelled()) {
        yield call(() => cancelSource.cancel());
      }
    }
  });
}
