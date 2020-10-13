import { createAction, createReducer } from "@reduxjs/toolkit";

const name = "discoverMovie";

/*

*/

export type DiscoverMovieTag = {
  id: string;
};

export type DiscoverMovieState = {
  tags: DiscoverMovieTag[];
  activeTags: DiscoverMovieTag[];
};

export const initialState: DiscoverMovieState = {
  tags: [],
  activeTags: [],
};

/* 

*/

const actions = {
  setTags: createAction<DiscoverMovieTag[]>(name + "/SET_TAGS"),
  setActiveTags: createAction<DiscoverMovieTag[]>(name + "/SET_ACTIVE_TAGS"),
};

/* 

*/

const selectors = {
  tags: (state: { [name]: DiscoverMovieState }) => state[name].tags,
  activeTags: (state: { [name]: DiscoverMovieState }) => state[name].activeTags,
};

/* 

*/

export const reducer = createReducer(initialState, {
  [actions.setTags.toString()]: (state, action) => {
    state.tags = action.payload;
  },
  [actions.setActiveTags.toString()]: (state, action) => {
    state.activeTags = action.payload;
  },
});

/* 

*/

export const discoverMovie = {
  selectors,
  actions,
  reducer,
};
