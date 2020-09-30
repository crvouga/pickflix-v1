import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { AuthState } from "./types";

const initialState: AuthState = {
  status: "loading",
  authStatus: "loading",
  user: false,
  error: undefined,
};

export default createReducer(initialState, {
  [actions.setAuthStatus.toString()]: (state, action) => {
    state.authStatus = action.payload;
  },
  [actions.setStatus.toString()]: (state, action) => {
    state.status = action.payload;
  },
  [actions.setUser.toString()]: (state, action) => {
    state.user = action.payload;
  },
  [actions.setError.toString()]: (state, action) => {
    state.error = action.payload;
  },
});
