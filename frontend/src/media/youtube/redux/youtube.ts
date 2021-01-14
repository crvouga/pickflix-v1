import { createAction, createReducer } from "@reduxjs/toolkit";

const name = "youtube";

type YoutubeError = {
  [key: string]: string;
};

export type YoutubeState = {
  error: YoutubeError;
};

/* 

*/

export const initialState: YoutubeState = {
  error: {},
};

/* 

*/

export const selectors = {
  // error: (state: AppState) => state.youtube.error || {},
};

/* 

*/

const actions = {
  setError: createAction<YoutubeError>(`${name}/SET_ERROR`),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setError.toString()]: (state, action) => {
    state.error = action.payload;
  },
});

/* 

*/

export const youtube = {
  actions,
  reducer,
  selectors,
};
