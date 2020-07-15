import axios from "axios";
import * as R from "ramda";
import { call, takeLatest, put, delay } from "redux-saga/effects";
import actions from "./actions";

const tagsToParams = R.pipe(
  R.groupBy(R.prop("type")),
  ({
    person = [],
    keyword = [],
    genre = [],
    company = [],
    dateRange = [],
    sortBy = [],
  }) => ({
    withPeople: R.pluck("id", person),
    withKeywords: R.pluck("id", keyword),
    withGenres: R.pluck("id", genre),
    withCompanies: R.pluck("id", company),
    ...(sortBy.length === 0
      ? {}
      : {
          sortBy: R.head(sortBy).sortBy,
        }),
    ...(dateRange.length === 0
      ? {}
      : {
          "primary_release_date.gte": `${R.apply(
            Math.min,
            R.head(dateRange).range
          )}-01-01`,
          "primary_release_date.lte": `${R.apply(
            Math.max,
            R.head(dateRange).range
          )}-12-31`,
        }),
  })
);

const fetchDiscoverMovies = (params) =>
  axios.get("/api/tmdb/discover/movie", {
    params,
  });

export default function* () {
  yield put(
    actions.sendMessage({ text: "Hello 👋🤖 Send me some movie data! 🎥🍿" })
  );
  yield takeLatest(actions.sendMessage, function* (action) {
    const message = action.payload;
    const response = yield call(
      fetchDiscoverMovies,
      tagsToParams(message.tags)
    );
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
  });
}
