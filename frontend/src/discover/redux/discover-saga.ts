import { union } from "ramda";
import { call, fork, put, select } from "redux-saga/effects";
import { getMovieGenres } from "../query";
import { DiscoverMovieTag, TagType } from "../query/types";
import { discoverTags } from "./discover-tags";

const getMovieGenreTags = async () => {
  const genresResponse = await getMovieGenres();
  const movieGenreTags: DiscoverMovieTag[] = genresResponse.genres.map(
    (genre) => ({
      type: TagType.withGenres,
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

export function* discoverMovieSaga() {
  yield fork(addMovieGenreTagsSaga);
}
