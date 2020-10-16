import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";
import { DiscoverMovieTag } from "../discover-movie-tags";

const name = "discoverTags";

/*

*/

export type DiscoverTagsState = {
  tags: DiscoverMovieTag[];
};

const initialState: DiscoverTagsState = {
  tags: [],
};

/* 

*/

const slice = (state: AppState) => state.discoverTags;
const tags = createSelector([slice], (slice) => slice.tags);
const selectors = {
  tags,
};

/* 

*/

const actions = {
  setTags: createAction<DiscoverMovieTag[]>(name + "/SET_TAGS"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setTags.toString()]: (state, action) => {
    state.tags = action.payload;
  },
});

/* 

*/

export const discoverTags = {
  selectors,
  actions,
  reducer,
};
