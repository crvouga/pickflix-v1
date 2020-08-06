import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import * as R from "ramda";

const setter = (key) => (state, action) => R.assoc(key, action.payload, state);

export default createReducer(
  {
    status: null,
    user: null,
    error: null,
  },
  {
    [actions.setStatus]: setter("status"),
    [actions.setUser]: setter("user"),
    [actions.setError]: setter("error"),
  }
);
