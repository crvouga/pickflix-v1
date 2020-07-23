import * as R from "ramda";
import {
  call,
  fork,
  put,
  select,
  takeEvery,
  takeLeading,
} from "redux-saga/effects";
import api from "../../../api";
import actions from "./actions";
import * as selectors from "./selectors";
import { queryCache } from "react-query";

const fetchGenres = () => api.get("/api/tmdb/genre/movie/list");

function* fetchInitialOptions() {
  const response = yield call(fetchGenres);
  const genres = R.map(R.assoc("type", "genre"), response.data.genres);
  const chips = yield select(selectors.chips);
  const newChips = R.union(chips, genres);
  yield put(actions.setOptions(newChips));
}

const tagsToParams = (tags) => {
  const {
    person = [],
    keyword = [],
    genre = [],
    company = [],
    dateRange = [],
    sortBy = [],
  } = R.groupBy(R.prop("type"), tags);

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
    () => api.get("/api/tmdb/discover/movie", config),
    {
      staleTime: Infinity,
    }
  );

  return response.data;
};

export default function* () {
  yield fork(fetchInitialOptions);

  yield takeEvery(actions.setChips, function* () {
    yield put(actions.setResponses([]));
    yield put(actions.load());
  });

  yield takeLeading(actions.load, function* () {
    try {
      const currentPage = yield select(selectors.currentPage);
      const chips = yield select(selectors.chips);
      yield put(actions.setStatus("loading"));
      const config = {
        params: {
          ...tagsToParams(chips),
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
