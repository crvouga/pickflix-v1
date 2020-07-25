import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer(
  {
    input: {
      text: "",
    },
    responses: [],
    status: "loading",
    history: [],
  },
  {
    [actions.setInput]: (state, action) => {
      state.input = action.payload;
    },
    [actions.setResponses]: (state, action) => {
      state.responses = action.payload;
    },
    [actions.setStatus]: (state, action) => {
      state.status = action.payload;
    },
    [actions.setHistory]: (state, action) => {
      state.history = action.payload;
    },
  }
);
