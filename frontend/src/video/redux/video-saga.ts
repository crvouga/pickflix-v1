import { put, select, takeEvery } from "redux-saga/effects";
import { video } from "./video";

export function* videoSaga() {
  yield takeEvery(video.actions.play, function* () {
    yield put(video.actions.setIsPlaying(true));
  });

  yield takeEvery(video.actions.pause, function* () {
    yield put(video.actions.setIsPlaying(false));
  });

  yield takeEvery(video.actions.toggle, function* () {
    const isPlaying = yield select(video.selectors.isPlaying);
    yield put(video.actions.setIsPlaying(!isPlaying));
  });
}
