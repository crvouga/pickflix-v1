import { difference, union } from "ramda";
import { call, fork, put, select, takeEvery } from "redux-saga/effects";
import { getMovieGenres } from "../query";
import { DiscoverMovieTag, TagType, uniqueTagTypes } from "../query/types";
import { discoverActiveTags } from "./discover-active-tags";
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

function* activeTagsLogic() {
  yield takeEvery(discoverActiveTags.actions.deactivate, function* (action) {
    const tag = action.payload;
    const activeTags: DiscoverMovieTag[] = yield select(
      discoverActiveTags.selectors.activeTags
    );
    const newActiveTags = difference(activeTags, [tag]);
    yield put(discoverActiveTags.actions.setActiveTags(newActiveTags));
  });

  yield takeEvery(discoverActiveTags.actions.activate, function* (action) {
    const tag = action.payload;

    const activeTags: DiscoverMovieTag[] = yield select(
      discoverActiveTags.selectors.activeTags
    );

    if (uniqueTagTypes.includes(tag.type)) {
      const newActiveTags = union(
        [tag],
        activeTags.filter((_) => _.type !== tag.type)
      );
      yield put(discoverActiveTags.actions.setActiveTags(newActiveTags));
    } else {
      const newActiveTags = union([tag], activeTags);
      yield put(discoverActiveTags.actions.setActiveTags(newActiveTags));
    }
  });
}

export function* discoverMovieSaga() {
  yield fork(addMovieGenreTagsSaga);
  yield fork(activeTagsLogic);
}
