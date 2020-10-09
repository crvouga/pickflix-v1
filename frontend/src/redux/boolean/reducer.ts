import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";

import { BooleanState } from "./types";

const initialState: BooleanState = {};

export default createReducer(initialState, {
  [actions.setTrue.toString()]: (state, action) => {
    state[action.payload] = true;
  },
  [actions.setFalse.toString()]: (state, action) => {
    state[action.payload] = false;
  },
  [actions.toggle.toString()]: (state, action) => {
    state[action.payload] = !state[action.payload];
  },
});
