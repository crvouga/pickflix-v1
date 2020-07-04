import { createAction, createReducer } from "@reduxjs/toolkit";

const selectors = {
  playing: (state) => state.player.playing,
  video: (state) => state.player.video,
};

const actions = {
  play: createAction("player/play"),
  pause: createAction("player/pause"),
  toggle: createAction("player/toggle"),
  setVideo: createAction("player/setVideo"),
};

const initialState = {
  playing: false,
  video: null,
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
});

export default {
  reducer,
  actions,
  selectors,
};
