import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer(
  {
    input: {
      options: [],
    },
    options: [],
    responses: [],
    status: "loading",
  },
  {
    [actions.setInput]: (state, action) => {
      state.input = action.payload;
    },
    [actions.options]: (state, action) => {
      state.options = action.payload;
    },
    [actions.setResponses]: (state, action) => {
      state.responses = action.payload;
    },
    [actions.setStatus]: (state, action) => {
      state.status = action.payload;
    },
  }
);
