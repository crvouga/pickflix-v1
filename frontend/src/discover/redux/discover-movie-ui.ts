import { createAction, createReducer } from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";

const name = "discoverMovieUi";

/*

*/

export type DiscoverMovieUiState = {
  speedDialOpen: boolean;
};

export const initialState: DiscoverMovieUiState = {
  speedDialOpen: false,
};

/* 

*/

const selectors = {
  speedDialOpen: (state: AppState) => state.discoverMovieUi.speedDialOpen,
};

/* 

*/

const actions = {
  setSpeedDialOpen: createAction<boolean>(name + "/SET_SPEED_DIAL_OPEN"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setSpeedDialOpen.toString()]: (state, action) => {
    state.speedDialOpen = action.payload;
  },
});

/* 

*/

export const discoverMovieUi = {
  selectors,
  actions,
  reducer,
};
