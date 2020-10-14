import { createAction, createReducer } from "@reduxjs/toolkit";
import { SearchResult } from "../query";
import { AppState } from "../../redux/types";
import { take } from "ramda";

const name = "search";

export type SearchState = {
  history: SearchResult[];
};

/* 

*/

export const initialState: SearchState = {
  history: [],
};

/* 

*/

export const selectors = {
  history: (state: AppState) => state.search.history || [],
};

/* 

*/

const actions = {
  setHistory: createAction<SearchResult[]>(`${name}/SET_HISTORY`),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setHistory.toString()]: (state, action) => {
    return {
      ...state,
      history: take(100, action.payload),
    };
  },
});

/* 

*/

export const search = {
  actions,
  reducer,
  selectors,
};
