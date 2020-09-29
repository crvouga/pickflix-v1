import backendAPI from "../../../../backendAPI";
import * as R from "ramda";
import { call, takeLatest, put, delay } from "redux-saga/effects";
import actions from "../actions";

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

const fetchDiscoverMovies = (params) =>
  backendAPI.get("/api/tmdb/discover/movie", {
    params,
  });

function* responseSaga(action) {
  const message = action.payload;
  const response = yield call(fetchDiscoverMovies, tagsToParams(message.tags));
  const movies = response.data.results;
  yield delay(500);
  if (movies.length === 0) {
    yield put(
      actions.recieveMessage({
        text: "Couldn't find any movies 🤷‍♂️",
        movies,
      })
    );
  } else {
    yield put(actions.recieveMessage({ tags: message.tags, movies }));
  }
}

const greetingMessage = {
  text: "Hello 👋🤖 Send me some movie data! 🎥🍿",
};

export default function* () {
  yield put(actions.sendMessage(greetingMessage));
  yield takeLatest(actions.sendMessage, responseSaga);
}
