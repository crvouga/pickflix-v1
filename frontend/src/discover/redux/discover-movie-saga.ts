import { union } from "ramda";

import { call, fork, put, select, take } from "redux-saga/effects";
import { DiscoverMovieTag } from "../discover-movie-tags";
import { getMovieGenres } from "../query";
import { discoverParams } from "./discover-params";
import { discoverTags } from "./discover-tags";
const getMovieGenreTags = async () => {
  const genresResponse = await getMovieGenres();
  const movieGenreTags: DiscoverMovieTag[] = genresResponse.genres.map(
    (genre) => ({
      type: "withGenres",
      ...genre,
    })
  );
  return movieGenreTags;
};

function* addMovieGenreTagsSaga() {
  const movieGenreTags: DiscoverMovieTag[] = yield call(getMovieGenreTags);
  const tags: DiscoverMovieTag[] = yield select(discoverTags.selectors.tags);
  yield put(discoverTags.actions.setTags(union(tags, movieGenreTags)));
}

const decadeTags: DiscoverMovieTag[] = [];

function* addDecadeTagsSaga() {
  const tags: DiscoverMovieTag[] = yield select(discoverTags.selectors.tags);
  yield put(discoverTags.actions.setTags(union(tags, decadeTags)));
}

export function* discoverMovieSaga() {
  yield fork(addMovieGenreTagsSaga);
  yield fork(addDecadeTagsSaga);
}
