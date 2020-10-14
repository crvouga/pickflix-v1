import { createAction, createReducer } from "@reduxjs/toolkit";
import { union } from "ramda";
import { DiscoverMovieTag, tagsToParams } from "../discover-movie-tags";
import { DiscoverMovieSortBy } from "../query/types";
import undoable, {
  StateWithHistory,
  ActionCreators,
  includeAction,
} from "redux-undo";
import { AppState } from "../../redux/types";

const name = "discoverMovie";

/*

*/

export type PresentState = {
  sortBy: DiscoverMovieSortBy;
  tags: DiscoverMovieTag[];
  activeTags: DiscoverMovieTag[];
};

export type DiscoverMovieState = StateWithHistory<PresentState>;

export const initialState: PresentState = {
  sortBy: "popularity.desc",
  tags: [],
  activeTags: [],
};

/* 

*/

const present = (state: AppState) => state.discoverMovie.present;

const selectors = {
  canUndo: (state: AppState) => state.discoverMovie.past.length > 0,
  canRedo: (state: AppState) => state.discoverMovie.future.length > 0,

  sortBy: (state: AppState) => present(state).sortBy,
  tags: (state: AppState) => present(state).tags,
  activeTags: (state: AppState) => present(state).activeTags,

  discoverMovieParams: (state: AppState) => {
    const params = tagsToParams(present(state).activeTags);
    return {
      ...params,
      sortBy: state[name].present.sortBy,
    };
  },
};

/* 

*/

const actions = {
  setSortBy: createAction<DiscoverMovieSortBy>(name + "/SET_SORT_BY"),
  setTags: createAction<DiscoverMovieTag[]>(name + "/SET_TAGS"),
  setActiveTags: createAction<DiscoverMovieTag[]>(name + "/SET_ACTIVE_TAGS"),
  undo: ActionCreators.undo,
  redo: ActionCreators.redo,
};

/* 

*/

const reducer = createReducer(initialState, {
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

//SOURCE: https://github.com/omnidan/redux-undo
const undoableReducer = undoable(reducer, {
  filter: includeAction([
    actions.setActiveTags.toString(),
    actions.setSortBy.toString(),
  ]),
  ignoreInitialState: true,
});

/* 

*/

export const discoverMovie = {
  selectors,
  actions,
  reducer: undoableReducer,
};
