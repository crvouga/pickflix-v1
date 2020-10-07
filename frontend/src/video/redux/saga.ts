import { put, select, takeEvery } from "redux-saga/effects";
import { actions, selectors } from "../../redux";

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
}
