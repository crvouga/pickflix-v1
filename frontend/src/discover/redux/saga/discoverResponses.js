import * as R from "ramda";
import { queryCache } from "react-query";
import { call, put, select, takeEvery, takeLeading } from "redux-saga/effects";
import backendAPI from "../../../backendAPI";
import * as actions from "../actions";
import * as selectors from "../selectors";

const tagsToParams = (tags) => {
  const {
    person = [],
    keyword = [],
    genre = [],
    company = [],
    dateRange = [],
  } = R.groupBy(R.prop("type"), tags);

  const params = R.map(R.pluck("id"), {
    withPeople: person,
    withKeywords: keyword,
    withGenres: genre,
    withCompanies: company,
  });

  if (dateRange.length > 0) {
    const range = R.head(dateRange).range;
    const gte = R.apply(Math.min, range);
    params["primary_release_date.gte"] = `${gte}-01-01`;

    const lte = R.apply(Math.max, range);
    params["primary_release_date.lte"] = `${lte}-12-31`;
  }

  return params;
};

const getDiscoverMovie = async (config) => {
  const response = await queryCache.prefetchQuery({
    queryKey: "discoverResponses",
    queryFn: () => backendAPI.get("/api/tmdb/discover/movie", config),
  });

  return response.data;
};

export default function* () {
  yield takeLeading(actions.requestDiscover, function* () {
    const tags = yield select(selectors.activeTags);
    const currentPage = yield select(selectors.currentPageDiscover);
    const config = {
      params: {
        ...tagsToParams(tags),
        page: currentPage + 1,
      },
    };
    const response = yield call(getDiscoverMovie, config);
    const responses = yield select(selectors.discoverResponses);
    yield put(actions.setDiscoverResponses(R.append(response, responses)));
  });

  yield takeEvery(actions.setActiveTags, function* () {
    yield put(actions.setDiscoverResponses([]));
    yield put(actions.requestDiscover());
  });
}
