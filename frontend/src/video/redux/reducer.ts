import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { initialState } from "./types";

export default createReducer(initialState, {
  [actions.setIsPlaying.toString()]: (state, action) => {
    state.isPlaying = action.payload;
  },
  [actions.setVideo.toString()]: (state, action) => {
    state.video = action.payload;
  },
  [actions.setPlaylist.toString()]: (state, action) => {
    state.playlist = action.payload;
  },
});
