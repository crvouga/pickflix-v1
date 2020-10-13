import { union } from "ramda";
import { call, fork, put, select } from "redux-saga/effects";
import { DiscoverMovieTag } from "../discover-movie-tags";
import { getMovieGenres } from "../query";
import { discoverMovie } from "./discover-movie";

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
  const tags: DiscoverMovieTag[] = yield select(discoverMovie.selectors.tags);
  yield put(discoverMovie.actions.setTags(union(tags, movieGenreTags)));
}

const decadeTags: DiscoverMovieTag[] = [];

function* addDecadeTagsSaga() {
  const tags: DiscoverMovieTag[] = yield select(discoverMovie.selectors.tags);
  yield put(discoverMovie.actions.setTags(union(tags, decadeTags)));
}

export function* discoverMovieSaga() {
  yield fork(addMovieGenreTagsSaga);
  yield fork(addDecadeTagsSaga);
}
