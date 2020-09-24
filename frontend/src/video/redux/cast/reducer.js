import { createReducer } from "@reduxjs/toolkit";

export default createReducer(
  {
    isPlaying: false,
    video: null,
    playlist: [],
  },
  {}
);
