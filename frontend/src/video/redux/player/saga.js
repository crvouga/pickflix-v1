import { put, select, takeEvery } from "redux-saga/effects";
import actions from "./actions";
import * as selectors from "./selectors";

export default function* () {
  // set video when playlist changes
  yield takeEvery(actions.setPlaylist, function* () {
    const playlist = yield select(selectors.playlist);
    const video = yield select(selectors.video);
    //if current video is not in playlist
    if (playlist.every((playlistVideo) => playlistVideo?.key !== video?.key)) {
      yield put(actions.setVideo(playlist?.[0]));
    }
  });
}
