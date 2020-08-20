import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";

const setPayload = (key) => (state, action) => {
  state[key] = action.payload;
};
export default createReducer(
  {
    isPlaying: false,
    video: null,
    playlist: [],
  },
  {
    [actions.setIsPlaying]: setPayload("isPlaying"),
    [actions.setVideo]: setPayload("video"),
    [actions.setPlaylist]: setPayload("playlist"),
  }
);
