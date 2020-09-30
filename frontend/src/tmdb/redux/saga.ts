import { put, select, takeLeading } from "redux-saga/effects";
import { actions, selectors } from "../../redux";
import { takeQueryResponse } from "../../redux/query/saga";
import * as queryConfigs from "./query-configs";

export default function* () {
  yield takeLeading(actions.tmdb.toggleLike, function* (action) {
    const tmdbMedia = action.payload;
    const isLiked = yield select(selectors.tmdb.isLiked(tmdbMedia));

    if (isLiked) {
      yield put(actions.tmdb.removeLike(tmdbMedia));
    } else {
      yield put(actions.tmdb.addLike(tmdbMedia));
    }
  });

  yield takeLeading(actions.tmdb.addLike, function* (action) {
    const tmdbMedia = action.payload;

    const config = queryConfigs.addLikeMutation(tmdbMedia);
    yield put(actions.query.mutateAsync(config));
    const { success, failure } = yield takeQueryResponse(config);
    if (success) {
      const message =
        tmdbMedia.tmdbMediaType === "movie"
          ? "Liked movie"
          : tmdbMedia.tmdbMediaType === "tv"
          ? "Liked TV show"
          : "Liked";

      yield put(
        actions.snackbar.display({
          message,
        })
      );
    }
    if (failure) {
    }
  });

  yield takeLeading(actions.tmdb.removeLike, function* (action) {
    const tmdbMedia = action.payload;

    const config = queryConfigs.removeLikeMutation(tmdbMedia);

    yield put(actions.query.mutateAsync(config));

    const { success, failure } = yield takeQueryResponse(config);

    if (success) {
      yield put(
        actions.snackbar.display({
          message: "Removed like",
        })
      );
    }
    if (failure) {
    }
  });
}
