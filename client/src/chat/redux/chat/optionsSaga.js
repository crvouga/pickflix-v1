import axios from "axios";
import * as R from "ramda";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import actions from "./actions";
import * as selectors from "./selectors";
const rangeStep = (start, step, end) =>
  R.unfold((n) => (n > end ? false : [n, n + step]), start);

const dateRangeOptions = R.map(
  (year) => ({
    type: "dateRange",
    year,
    range: [year, year + 9],
    name: `${year}s`,
    id: year,
  }),
  rangeStep(1880, 10, new Date().getFullYear())
);

const fetchGenres = () => axios.get("/api/tmdb/genre/movie/list");

const fetchSearch = async (endpoint, params) => {
  if (params.query.length === 0) {
    return { results: [] };
  }
  const response = await axios.get(endpoint, { params });
  return response.data;
};

const fetchAllSearches = async (params) => {
  const [person, company, keyword] = await Promise.all([
    fetchSearch("/api/tmdb/search/person", params),
    fetchSearch("/api/tmdb/search/company", params),
    fetchSearch("/api/tmdb/search/keyword", params),
  ]);
  return {
    person,
    company,
    keyword,
  };
};

export default function* () {
  const response = yield call(fetchGenres);
  const genreOptions = R.map(R.assoc("type", "genre"), response.data.genres);
  const options = R.unnest([genreOptions, dateRangeOptions]);
  yield put(actions.setOptions(options));

  yield takeLatest(actions.setText, function* () {
    yield delay(200);
    const text = yield select(selectors.text);
    const response = yield call(fetchAllSearches, { query: encodeURI(text) });

    const optionByType = {
      dateRange: dateRangeOptions,
      genre: genreOptions,
      person: response.person.results || [], //R.project(["id", "name", "profilePath"], response.person.results || [])
      company: response.company.results || [],
      keyword: response.keyword.results || [],
    };

    const options = R.pipe(
      R.toPairs,
      R.chain(([type, options]) => R.map(R.assoc("type", type), options))
    )(optionByType);

    yield put(actions.setOptions(options));
  });
}
