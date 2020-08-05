import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer(
  {
    status: null,
    user: null,
    error: null,
  },
  {
    [actions.setStatus]: (state, action) => {
      state.status = action.payload;
    },
    [actions.setUser]: (state, action) => {
      state.user = action.payload;
    },
    [actions.setError]: (state, action) => {
      state.error = action.payload;
    },
  }
);
