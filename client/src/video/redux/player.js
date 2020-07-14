import { createAction, createReducer } from "@reduxjs/toolkit";
import { takeEvery, select, put } from "redux-saga/effects";

const initialState = {
  playing: false,
  video: null,
  playlist: [],
};

const selectors = {
  playing: (state) => state.player.playing,
  video: (state) => state.player.video,
  playlist: (state) => state.player.playlist,
};

const actions = {
  play: createAction("player/play"),
  pause: createAction("player/pause"),
  toggle: createAction("player/toggle"),
  setVideo: createAction("player/setVideo"),
  setPlaylist: createAction("player/setPlaylist"),
};

const reducer = createReducer(initialState, {
  [actions.play]: (state) => {
    state.playing = true;
  },
  [actions.pause]: (state) => {
    state.playing = false;
  },
  [actions.toggle]: (state) => {
    state.playing = !state.playing;
  },
  [actions.setVideo]: (state, action) => {
    state.video = action.payload;
  },
  [actions.setPlaylist]: (state, action) => {
    state.playlist = action.payload;
  },
});

function* saga() {
  // set video when playlist changes
  yield takeEvery(actions.setPlaylist, function* () {
    const playlist = yield select(selectors.playlist);
    const video = yield select(selectors.video);
    if (playlist.every((playlistVideo) => playlistVideo?.key !== video?.key)) {
      yield put(actions.setVideo(playlist?.[0]));
    }
  });
}

export default {
  reducer,
  actions,
  selectors,
  saga,
};
