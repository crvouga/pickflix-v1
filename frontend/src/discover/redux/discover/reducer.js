import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer(
  {
    chips: [],
    suggestions: [],
  },
  {
    [actions.setChips]: (state, action) => {
      state.chips = action.payload;
    },
    [actions.setSuggestions]: (state, action) => {
      state.suggestions = action.payload;
    },
  }
);
