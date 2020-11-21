import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { union } from "ramda";
import { AppState } from "../../app/redux/types";
import { DiscoverMovieTag } from "../query/types";
import { discoverActiveTags } from "./discover-active-tags";

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
  slice,
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
  [discoverActiveTags.actions.setActiveTags.toString()]: (state, action) => {
    state.tags = union(action.payload, state.tags);
  },
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
