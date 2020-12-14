import {
  createAction,
  createReducer,
  createSelector,
  bindActionCreators,
} from "@reduxjs/toolkit";
import equals from "fast-deep-equal";
import undoable, {
  includeAction,
  StateWithHistory,
  UndoableOptions,
} from "redux-undo";
import { AppState } from "../../app/redux/types";
import { IDiscoverTag } from "../query/types";
import { useDispatch, useSelector } from "react-redux";

const name = "discoverActiveTags";

/*

*/

export type PresentState = {
  activeTagsById: { [id: string]: IDiscoverTag };
};

export type DiscoverActiveTags = StateWithHistory<PresentState>;

const initialPresentState: PresentState = {
  activeTagsById: {},
};

/* 

*/

const actions = {
  setActiveTagsById: createAction<{ [id: string]: IDiscoverTag }>(
    name + "/SET_ACTIVE_TAGS_BY_ID"
  ),
  //
  undo: createAction(name + "/UNDO"),
  redo: createAction(name + "/REDO"),
  clearHistory: createAction(name + "/CLEAR_HISTORY"),
  //
  activate: createAction<IDiscoverTag>(name + "/ACTIVATE"),
  deactivate: createAction<IDiscoverTag>(name + "/DEACTIVATE"),
};

/* 


*/

const slice = (state: AppState) => state.discoverActiveTags;
const selectors = {
  slice,
};

/* 

*/

const reducer = createReducer(initialPresentState, {
  [actions.setActiveTagsById.toString()]: (state, action) => {
    state.activeTagsById = action.payload;
  },
});

/* 


*/

//DOCS: https://github.com/omnidan/redux-undo
const whitelist = [actions.setActiveTagsById.toString()];
const undoableOptions: UndoableOptions<PresentState> = {
  limit: 200,
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
  clearHistoryType: actions.clearHistory.toString(),

  ignoreInitialState: true,
};

const enhancedReducer = undoable(reducer, undoableOptions);

/* 

*/

export const discoverActiveTags = {
  selectors,
  actions,
  reducer: enhancedReducer,
  initialState: initialPresentState,
};

/* 

*/

export const useDiscoverActiveTagsState = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(discoverActiveTags.actions, dispatch);
  const slice = useSelector(discoverActiveTags.selectors.slice);
  return {
    ...actions,
    ...slice,
  };
};
