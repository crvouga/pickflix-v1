import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer(
  {
    isPlaying: false,
    video: null,
    playlist: [],
  },
  {}
);
