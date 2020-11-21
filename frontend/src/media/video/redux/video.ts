import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { AppState } from "../../../app/redux/types";
import { MovieVideo } from "../../tmdb/types";

const name = "video";

/* 


*/

export interface VideoProgress {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

type VideoError = {
  [key: string]: string;
};

export type VideoState = {
  isPlaying: boolean;
  currentVideo: MovieVideo | undefined;
  playlist: MovieVideo[];
  error: VideoError | undefined;
  light: string | undefined;
};

export const initialState: VideoState = {
  isPlaying: false,
  currentVideo: undefined,
  playlist: [],
  error: undefined,
  light: undefined,
};

/* 

*/

const actions = {
  setCurrentVideo: createAction<MovieVideo | undefined>(
    name + "/SET_CURRENT_VIDEO"
  ),
  setPlaylist: createAction<MovieVideo[]>(name + "/SET_PLAYLIST"),
  setIsPlaying: createAction<boolean>(name + "/SET_IS_PLAYING"),
  setError: createAction<VideoError | undefined>(name + "/SET_ERROR"),
  setLight: createAction<string | undefined>(name + "/SET_LIGHT"),
  //
  progress: createAction<VideoProgress>(name + "/PROGRESS"),
};

/* 


*/

const slice = (state: AppState) => state.video;
const isPlaying = createSelector([slice], (slice) => slice.isPlaying);
const currentVideo = createSelector([slice], (slice) => slice.currentVideo);
const playlist = createSelector([slice], (slice) => slice.playlist);
const selectors = {
  slice,
  isPlaying,
  currentVideo,
  playlist,
};

/* 


*/

export const reducer = createReducer(initialState, {
  [actions.setIsPlaying.toString()]: (state, action) => {
    state.isPlaying = action.payload;
  },
  [actions.setCurrentVideo.toString()]: (state, action) => {
    state.currentVideo = action.payload;
  },
  [actions.setPlaylist.toString()]: (state, action) => {
    state.playlist = action.payload;
  },
  [actions.setError.toString()]: (state, action) => {
    state.error = action.payload;
  },
  [actions.setLight.toString()]: (state, action) => {
    state.light = action.payload;
  },
});

/* 


*/

export const video = {
  reducer,
  actions,
  selectors,
};
