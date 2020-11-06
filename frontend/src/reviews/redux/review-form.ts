import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";
import { TmdbMedia } from "../../tmdb/types";

const name = "reviewForm";

/* 

*/

export type ReviewFormState = {
  tmdbMedia?: TmdbMedia;
};

/* 

*/

const initialState: ReviewFormState = {
  tmdbMedia: undefined,
};

/* 

*/

const slice = (state: AppState) => state.reviewForm;
const selectors = {
  slice,
  tmdbMedia: createSelector([slice], (slice) => slice.tmdbMedia),
};

/* 

*/

const actions = {
  setTmdbMedia: createAction<TmdbMedia | undefined>(name + "/SET_TMDB_MEDIA"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setTmdbMedia.toString()]: (state, action) => {
    state.tmdbMedia = action.payload;
  },
});

/* 

*/

export const reviewForm = {
  actions,
  reducer,
  selectors,
};
