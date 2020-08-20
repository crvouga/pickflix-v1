import axios from "axios";
import * as R from "ramda";
import {
  call,
  cancelled,
  delay,
  put,
  select,
  takeLatest,
  all,
} from "redux-saga/effects";
import backendAPI from "../../../../backendAPI";
import actions from "../actions";
import * as selectors from "../selectors";
import { queryCache } from "react-query";

const rangeStep = (start, step, end) =>
  R.unfold((n) => (n > end ? false : [n, n + step]), start);

const decades = rangeStep(1940, 10, new Date().getFullYear());

const dateRangeOptions = decades.map((year) => ({
  type: "dateRange",
  year,
  range: [year, year + 9],
  name: `${year}s`,
  id: year,
}));

const fetchGenres = () => backendAPI.get("/api/tmdb/genre/movie/list");

const fetchSearch = async (endpoint, config) => {
  if (config.params.query.length === 0) {
    return { results: [] };
  }
  const URL = "/api/tmdb/search" + endpoint;
  const response = await queryCache.prefetchQuery(
    ["search", endpoint, config.params],
    () => backendAPI.get(URL, config),
    {
      staleTime: Infinity,
    }
  );
  return response.data;
};

export default function* () {
  const response = yield call(fetchGenres);
  const genreOptions = R.map(R.assoc("type", "genre"), response.data.genres);
  const options = R.concat(genreOptions, dateRangeOptions);
  yield put(actions.setOptions(options));

  yield takeLatest(actions.setText, function* () {
    const cancelSource = axios.CancelToken.source();
    try {
      yield delay(200);
      const text = yield select(selectors.text);

      const config = {
        cancelToken: cancelSource.token,
        params: {
          query: encodeURI(text.trim()),
        },
      };

      yield put(actions.setStatus("loading"));
      const response = yield all({
        person: call(fetchSearch, "/person", config),
        keyword: call(fetchSearch, "/keyword", config),
        // company: call(fetchSearch, "/company", config)
      });
      yield put(actions.setStatus("success"));

      const optionByType = {
        dateRange: dateRangeOptions,
        genre: genreOptions,
        person: R.project(
          ["id", "name", "profilePath"],
          response.person.results || []
        ),
        keyword: response.keyword.results || [],
        // company: response.company.results || [],
      };

      const newOptions = R.pipe(
        R.toPairs,
        R.chain(([type, options]) => R.map(R.assoc("type", type), options))
      )(optionByType);

      yield put(actions.setOptions(newOptions));
    } catch (error) {
      yield put(actions.setStatus("error"));
    } finally {
      if (yield cancelled()) {
        yield call(() => cancelSource.cancel());
      }
    }
  });
}
