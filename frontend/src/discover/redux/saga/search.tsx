import {
  all,
  cancelled,
  call,
  delay,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import axios, { AxiosRequestConfig } from "axios";
import backendAPI from "../../../backendAPI";
import * as actions from "../actions";
import * as selectors from "../selectors";
import * as R from "ramda";
import { Result, Response } from "../types";

const getSearchPerson = async (config: AxiosRequestConfig) => {
  const response = await backendAPI.get("/api/tmdb/search/person", config);
  return response.data;
};

const getSearchKeyword = async (config: AxiosRequestConfig) => {
  const response = await backendAPI.get("/api/tmdb/search/keyword", config);
  return response.data;
};

const getSearchCompany = async (config: AxiosRequestConfig) => {
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
          const response: Response = yield call(getSearchPerson, config);
          const results: Result[] = R.map(
            R.assoc("type", "person"),
            response.results
          );
          const searchResults: Result[] = yield select(selectors.searchResults);

          yield put(
            actions.setSearchResults(
              R.unionWith(
                (result1, result2) => result1.id === result2.id,

                results,
                searchResults
              )
            )
          );
        }),
        call(function* () {
          const response: Response = yield call(getSearchCompany, config);
          const results: Result[] = R.map(
            R.assoc("type", "company"),
            response.results
          );
          const searchResults: Result[] = yield select(selectors.searchResults);

          yield put(
            actions.setSearchResults(
              R.unionWith(
                (result1, result2) => result1.id === result2.id,
                results,
                searchResults
              )
            )
          );
        }),

        call(function* () {
          const response: Response = yield call(getSearchKeyword, config);
          const results: Result[] = R.map(
            R.assoc("type", "keyword"),
            response.results
          );
          const searchResults: Result[] = yield select(selectors.searchResults);
          yield put(
            actions.setSearchResults(
              R.unionWith(
                (result1, result2) => result1.id === result2.id,
                results,
                searchResults
              )
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
