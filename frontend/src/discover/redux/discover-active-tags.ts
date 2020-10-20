import {
  createAction,
  createReducer,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import equals from "fast-deep-equal";
import localforage from "localforage";
import { persistReducer } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import undoable, {
  includeAction,
  StateWithHistory,
  UndoableOptions,
} from "redux-undo";
import { AppState } from "../../redux/types";
import { DiscoverMovieTag } from "../query/types";

const name = "discoverActiveTags";

/*

*/

export type PresentState = {
  activeTags: DiscoverMovieTag[];
};

export type DiscoverActiveTags = StateWithHistory<PresentState>;

const initialPresentState: PresentState = {
  activeTags: [],
};

/* 

*/

const actions = {
  setActiveTags: createAction<DiscoverMovieTag[]>(name + "/SET_ACTIVE_TAGS"),
  //
  undo: createAction(name + "/UNDO"),
  redo: createAction(name + "/REDO"),
  //
  activate: createAction<DiscoverMovieTag>(name + "/ACTIVATE"),
  deactivate: createAction<DiscoverMovieTag>(name + "/DEACTIVATE"),
};

/* 


*/

const slice = (state: AppState) => state.discoverActiveTags;
const canUndo = createSelector([slice], (slice) => slice.past.length > 0);
const canRedo = createSelector([slice], (slice) => slice.future.length > 0);
const activeTags = createSelector([slice], (slice) => slice.present.activeTags);

const selectors = {
  slice,
  canUndo,
  canRedo,
  activeTags,
};

/* 

*/

const reducer = createReducer(initialPresentState, {
  [actions.setActiveTags.toString()]: (
    state,
    action: PayloadAction<DiscoverMovieTag[]>
  ) => {
    state.activeTags = action.payload;
  },
});

/* 


*/

//DOCS: https://github.com/omnidan/redux-undo
const whitelist = [actions.setActiveTags.toString()];
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

  // ignoreInitialState: true,
};

//DOCS: https://github.com/rt2zz/redux-persist#state-reconciler
const persistConfig = {
  key: name,
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

export const discoverActiveTags = {
  selectors,
  actions,
  reducer: enhancedReducer,
  initialState: initialPresentState,
};
