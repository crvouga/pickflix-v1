import { createAction, createReducer } from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";

const name = "personPageUi";

/* 


*/

export type PersonPageUiState = {
  isGridOn: boolean;
};

export const initialState = {
  isGridOn: true,
};

/* 

*/

const actions = {
  toggleGrid: createAction(`${name}/TOGGLE_GRID`),
};

/* 

*/

const selectors = {
  isGridOn: (state: AppState) => state.personPageUi.isGridOn,
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.toggleGrid.toString()]: (state, action) => {
    state.isGridOn = !state.isGridOn;
  },
});

/* 

*/

export const personPageUi = {
  actions,
  selectors,
  reducer,
};
