import * as R from "ramda";
import { queryCache } from "react-query";
import { call, put, select, takeEvery, takeLeading } from "redux-saga/effects";
import backendAPI from "../../../backendAPI";
import actions from "../actions";
import * as selectors from "../selectors";

const inputToParams = (input) => {
  const {
    person = [],
    keyword = [],
    genre = [],
    company = [],
    dateRange = [],
    sortBy = [],
  } = input;

  const params = {
    withPeople: R.pluck("id", person),
    withKeywords: R.pluck("id", keyword),
    withGenres: R.pluck("id", genre),
    withCompanies: R.pluck("id", company),
  };

  if (sortBy.length > 0) {
    params.sortBy = R.head(sortBy).sortBy;
  }

  if (dateRange.length > 0) {
    const range = R.head(dateRange).range;
    const gte = R.apply(Math.min, range);
    params["primary_release_date.gte"] = `${gte}-01-01`;

    const lte = R.apply(Math.max, range);
    params["primary_release_date.lte"] = `${lte}-12-31`;
  }

  return params;
};

const fetchDiscover = async (config) => {
  const response = await queryCache.prefetchQuery(
    ["discover", config.params],
    () => backendAPI.get("/api/tmdb/discover/movie", config),
    {
      staleTime: Infinity,
    }
  );

  return response.data;
};

export default function* () {
  yield put(actions.fetch());

  yield takeEvery(actions.setInput, function* () {
    yield put(actions.setResponses([]));
    yield put(actions.fetch());
  });

  yield takeLeading(actions.fetch, function* () {
    yield put(actions.setStatus("loading"));
    try {
      const currentPage = yield select(selectors.currentPage);
      const input = yield select(selectors.input);
      const config = {
        params: {
          ...inputToParams(input),
          page: currentPage + 1,
        },
      };
      const response = yield call(fetchDiscover, config);
      yield put(actions.setStatus("success"));
      const responses = yield select(selectors.responses);
      yield put(actions.setResponses(R.append(response, responses)));
    } catch (e) {
      yield put(actions.setStatus("error"));
    }
  });
}
