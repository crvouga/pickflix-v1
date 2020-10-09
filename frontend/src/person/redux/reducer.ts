import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { PersonPageState } from "./types";

const initialState: PersonPageState = {
  isGridOn: false,
};

export default createReducer(initialState, {
  [actions.toggleGrid.toString()]: (state, action) => {
    state.isGridOn = !state.isGridOn;
  },
});
