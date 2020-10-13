import { createAction, createReducer } from "@reduxjs/toolkit";
import { union, sortBy } from "ramda";
import { DiscoverMovieTag, tagsToParams } from "../discover-movie-tags";
import { DiscoverMovieSortBy } from "../query/types";

const name = "discoverMovie";

/*

*/

export type DiscoverMovieState = {
  sortBy: DiscoverMovieSortBy;
  tags: DiscoverMovieTag[];
  activeTags: DiscoverMovieTag[];
};

export const initialState: DiscoverMovieState = {
  sortBy: "popularity.desc",
  tags: [],
  activeTags: [],
};

/* 

*/

type AppState = {
  [name]: DiscoverMovieState;
};

const selectors = {
  sortBy: (state: AppState) => state[name].sortBy,
  tags: (state: AppState) => state[name].tags,
  activeTags: (state: AppState) => state[name].activeTags,
  discoverMovieParams: (state: AppState) => {
    const params = tagsToParams(state[name].activeTags);
    return {
      ...params,
      sortBy: state[name].sortBy,
    };
  },
};

/* 

*/

const actions = {
  setSortBy: createAction<DiscoverMovieSortBy>(name + "/SET_SORT_BY"),
  setTags: createAction<DiscoverMovieTag[]>(name + "/SET_TAGS"),
  setActiveTags: createAction<DiscoverMovieTag[]>(name + "/SET_ACTIVE_TAGS"),
};

/* 

*/

export const reducer = createReducer(initialState, {
  [actions.setSortBy.toString()]: (state, action) => {
    state.sortBy = action.payload;
  },
  [actions.setTags.toString()]: (state, action) => {
    state.tags = action.payload;
  },
  [actions.setActiveTags.toString()]: (state, action) => {
    state.activeTags = action.payload;
    // "activeTags" should by subset of "tags"
    state.tags = union(state.tags, state.activeTags);
  },
});

/* 

*/

export const discoverMovie = {
  selectors,
  actions,
  reducer,
};
