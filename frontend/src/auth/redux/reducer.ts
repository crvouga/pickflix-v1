import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";

export default createReducer(
  {
    status: null,
    user: null,
    error: null,
  },
  {
    [actions.setStatus.toString()]: (state, action) => {
      state.status = action.payload;
    },
    [actions.setUser.toString()]: (state, action) => {
      state.user = action.payload;
    },
    [actions.setError.toString()]: (state, action) => {
      state.error = action.payload;
    },
  }
);
