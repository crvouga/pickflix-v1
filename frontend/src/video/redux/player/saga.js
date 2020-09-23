import * as R from "ramda";
import { put, select, spawn, takeEvery } from "redux-saga/effects";
import { actions, selectors } from "../../../redux";

export default function* () {
  yield takeEvery(actions.player.play, function* () {
    yield put(actions.player.setIsPlaying(true));
  });

  yield takeEvery(actions.player.pause, function* () {
    yield put(actions.player.setIsPlaying(false));
  });

  yield takeEvery(actions.player.toggle, function* () {
    const isPlaying = yield select(selectors.isPlaying);
    yield put(actions.player.setIsPlaying(!isPlaying));
  });

  yield takeEvery(actions.player.setPlaylist, function* () {
    const playlist = yield select(selectors.player.playlist);
    const video = yield select(selectors.player.video);

    if (R.not(R.includes(video, playlist))) {
      yield put(actions.player.setVideo(playlist?.[0]));
    }
  });

  yield spawn(function* () {
    yield takeEvery(
      [actions.player.play, actions.player.progress],
      function* () {
        const isVideoOpen = yield select(selectors.modal.isOpen("video"));
        if (!isVideoOpen) {
          yield put(actions.player.setIsPlaying(false));
        }
      }
    );
  });
}
