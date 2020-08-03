import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer(
  {
    user: null,
  },
  {
    [actions.setUser]: (state, action) => {
      state.user = action.payload;
    },
  }
);
