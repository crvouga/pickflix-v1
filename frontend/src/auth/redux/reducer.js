import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const setPayload = (key) => (state, action) => {
  state[key] = action.payload;
};

export default createReducer(
  {
    status: null,
    user: null,
    error: null,
  },
  {
    [actions.setStatus]: setPayload("status"),
    [actions.setUser]: setPayload("user"),
    [actions.setError]: setPayload("error"),
  }
);
