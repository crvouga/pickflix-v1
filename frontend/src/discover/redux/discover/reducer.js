import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer(
  {
    chips: [],
    options: [],
    responses: [],
    status: "loading",
  },
  {
    [actions.setChips]: (state, action) => {
      state.chips = action.payload;
    },
    [actions.setOptions]: (state, action) => {
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
