import * as R from "ramda";
import { put, select, spawn, takeEvery } from "redux-saga/effects";
import { actions, selectors } from "../../redux";
import { ModalName } from "../../redux/router/types";

export default function* () {
  yield takeEvery(actions.video.play, function* () {
    yield put(actions.video.setIsPlaying(true));
  });

  yield takeEvery(actions.video.pause, function* () {
    yield put(actions.video.setIsPlaying(false));
  });

  yield takeEvery(actions.video.toggle, function* () {
    const isPlaying = yield select(selectors.video.isPlaying);
    yield put(actions.video.setIsPlaying(!isPlaying));
  });

  yield takeEvery(actions.video.setPlaylist, function* () {
    const playlist = yield select(selectors.video.playlist);
    const video = yield select(selectors.video.video);

    if (R.not(R.includes(video, playlist))) {
      yield put(actions.video.setVideo(playlist?.[0]));
    }
  });

  // yield spawn(function* () {
  //   yield takeEvery([actions.video.play, actions.video.progress], function* () {
  //     const isVideoOpen: boolean = yield select(
  //       selectors.router.isOpen(ModalName.VideoPlayer)
  //     );
  //     if (!isVideoOpen) {
  //       yield put(actions.video.setIsPlaying(false));
  //     }
  //   });
  // });
}
