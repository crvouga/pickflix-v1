import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import localforage from "localforage";
import { persistReducer, PersistConfig } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import undoable, {
  includeAction,
  StateWithHistory,
  UndoableOptions,
} from "redux-undo";
import { AppState } from "../../redux/types";
import { DiscoverMovieTag, tagsToParams } from "../discover-movie-tags";
import { DiscoverMovieQueryParams, DiscoverMovieSortBy } from "../query/types";
import { equals } from "ramda";

const name = "discoverMovie";

/*

*/

export type PresentState = {
  activeTags: DiscoverMovieTag[];
  sortBy: DiscoverMovieSortBy;
};

export type DiscoverParamsState = StateWithHistory<PresentState>;

const initialPresentState: PresentState = {
  sortBy: "popularity.desc",
  activeTags: [],
};

/* 

*/

const slice = (state: AppState) => state.discoverParams;
const present = (state: AppState) => state.discoverParams.present;
const canUndo = createSelector([slice], (slice) => slice.past.length > 0);
const canRedo = createSelector([slice], (slice) => slice.future.length > 0);
const sortBy = createSelector([present], (present) => present.sortBy);
const activeTags = createSelector([present], (present) => present.activeTags);
const discoverQueryParams = createSelector(
  [activeTags, sortBy],
  (activeTags, sortBy): DiscoverMovieQueryParams => ({
    ...tagsToParams(activeTags),
    sortBy,
  })
);
const selectors = {
  canUndo,
  canRedo,
  sortBy,
  activeTags,
  discoverQueryParams,
};

/* 

*/

const actions = {
  setSortBy: createAction<DiscoverMovieSortBy>(name + "/SET_SORT_BY"),
  setActiveTags: createAction<DiscoverMovieTag[]>(name + "/SET_ACTIVE_TAGS"),
  undo: createAction(name + "/UNDO"),
  redo: createAction(name + "/REDO"),
};

/* 

*/

const reducer = createReducer(initialPresentState, {
  [actions.setSortBy.toString()]: (state, action) => {
    state.sortBy = action.payload;
  },
  [actions.setActiveTags.toString()]: (state, action) => {
    state.activeTags = action.payload;
  },
});

/* 


*/

//DOCS: https://github.com/omnidan/redux-undo
const whitelist = [
  actions.setActiveTags.toString(),
  actions.setSortBy.toString(),
];
const undoableOptions: UndoableOptions<PresentState> = {
  filter: (action, currentState, previousHistory) => {
    const isWhitelisted = includeAction(whitelist)(
      action,
      currentState,
      previousHistory
    );
    return isWhitelisted && !equals(currentState, previousHistory.present);
  },

  undoType: actions.undo.toString(),
  redoType: actions.redo.toString(),

  ignoreInitialState: true,
};

//DOCS: https://github.com/rt2zz/redux-persist#state-reconciler
const persistConfig = {
  key: "discoverParams",
  storage: localforage,
  stateReconciler: hardSet,
};

const enhancedReducer = persistReducer(
  persistConfig,
  //@ts-ignore
  undoable(reducer, undoableOptions)
);

/* 

*/

export const discoverParams = {
  selectors,
  actions,
  reducer: enhancedReducer,
};
