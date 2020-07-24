import { put, select, takeEvery } from "redux-saga/effects";
import modal from "../../../common/redux/modal";
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

  // ensure the player is paused when the video modal is closed
  yield takeEvery([actions.play, actions.progress], function* () {
    const isVideoOpen = yield select(modal.selectors.isOpen("video"));
    if (!isVideoOpen) {
      yield put(actions.pause());
    }
  });
}
