import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { initialState } from "./types";

export default createReducer(initialState, {
  [actions.setStatus.toString()]: (state, action) => {
    state.status = action.payload;
  },
  [actions.setStep.toString()]: (state, action) => {
    state.step = action.payload;
  },
  [actions.setError.toString()]: (state, action) => {
    state.error = action.payload;
  },
  [actions.setValues.toString()]: (state, action) => {
    state.values = action.payload;
  },
  [actions.reset.toString()]: (state, action) => {
    return initialState;
  },
});
