import api from "../../../../api";
import * as R from "ramda";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import actions from "../actions";
import * as selectors from "../selectors";
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

const fetchGenres = () => api.get("/api/tmdb/genre/movie/list");

const fetchSearch = async (endpoint, params) => {
  if (params.query.length === 0) {
    return { results: [] };
  }
  const response = await api.get(endpoint, { params });
  return response.data;
};

const fetchAllSearches = async (params) => {
  const [person, company, keyword] = await Promise.all([
    fetchSearch("/api/tmdb/search/person", params),
    Promise.resolve({ results: [] }), //fetchSearch("/api/tmdb/search/company", params),
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
  const options = R.concat(genreOptions, dateRangeOptions);
  yield put(actions.setOptions(options));

  yield takeLatest(actions.setText, function* () {
    yield delay(200);
    const text = yield select(selectors.text);
    yield put(actions.setIsFetchingOptions(true));
    const response = yield call(fetchAllSearches, {
      query: encodeURI(text.trim()),
    });

    const optionByType = {
      dateRange: dateRangeOptions,
      genre: genreOptions,
      person: R.project(
        ["id", "name", "profilePath"],
        response.person.results || []
      ),
      company: response.company.results || [],
      keyword: response.keyword.results || [],
    };

    const options = R.pipe(
      R.toPairs,
      R.chain(([type, options]) => R.map(R.assoc("type", type), options))
    )(optionByType);

    yield put(actions.setOptions(options));
    yield put(actions.setIsFetchingOptions(false));
  });
}
