import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer(
  {
    text: "",
    options: {},
    input: {},
    status: "loading",
    responses: [],
  },
  {
    [actions.setText]: (state, action) => {
      state.text = action.payload;
    },
    [actions.setOptions]: (state, action) => {
      state.options = action.payload;
    },
    [actions.setInput]: (state, action) => {
      state.input = action.payload;
    },
    [actions.setResponses]: (state, action) => {
      state.responses = action.payload;
    },
    [actions.setStatus]: (state, action) => {
      state.status = action.payload;
    },
  }
);
