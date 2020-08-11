import * as R from "ramda";
import { queryCache } from "react-query";
import { call, put, select, takeEvery, takeLeading } from "redux-saga/effects";
import backendAPI from "../../../backendAPI";
import * as actions from "../actions";
import * as selectors from "../selectors";

const tagsToParams = (tags) => {
  console.log(tags);
  const {
    person = [],
    keyword = [],
    genre = [],
    company = [],
    dateRange = [],
    sortBy = [],
  } = R.groupBy(R.prop("type"), tags);

  const params = R.map(R.pluck("id"), {
    withPeople: person,
    withKeywords: keyword,
    withGenres: genre,
    withCompanies: company,
  });

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
  yield takeEvery(
    [actions.selected, actions.unselected, actions.toggle],
    function* () {
      yield put(actions.setResponses([]));
      yield put(actions.fetch());
    }
  );

  yield takeLeading(actions.fetch, function* () {
    yield put(actions.setResponseStatus("loading"));
    try {
      const currentPage = yield select(selectors.currentPage);
      const selectedTags = yield select(selectors.selectedTags);
      const config = {
        params: {
          ...tagsToParams(selectedTags),
          page: currentPage + 1,
        },
      };
      const response = yield call(fetchDiscover, config);
      yield put(actions.setResponseStatus("success"));
      const responses = yield select(selectors.responses);
      const newReponses = R.append(response, responses);
      yield put(actions.setResponses(newReponses));
    } catch (e) {
      yield put(actions.setResponseStatus("error"));
    }
  });

  yield put(actions.fetch());
}
