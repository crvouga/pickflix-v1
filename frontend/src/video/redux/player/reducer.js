import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer(
  {
    isPlaying: false,
    video: null,
    playlist: [],
  },
  {
    [actions.play]: (state) => {
      state.isPlaying = true;
    },
    [actions.pause]: (state) => {
      state.isPlaying = false;
    },
    [actions.toggle]: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    [actions.setVideo]: (state, action) => {
      state.video = action.payload;
    },
    [actions.setPlaylist]: (state, action) => {
      state.playlist = action.payload;
    },
  }
);
