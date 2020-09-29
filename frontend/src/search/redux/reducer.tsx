import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer(
  {
    focused: true,
    text: "",
    responses: [],
    status: "loading",
    recentlySearched: [],
  },
  {
    [actions.setFocused.toString()]: (state, action) => {
      state.focused = action.payload;
    },
    [actions.setText.toString()]: (state, action) => {
      state.text = action.payload;
    },
    [actions.setResponses.toString()]: (state, action) => {
      state.responses = action.payload;
    },
    [actions.setStatus.toString()]: (state, action) => {
      state.status = action.payload;
    },
    [actions.setRecentlySearched.toString()]: (state, action) => {
      state.recentlySearched = action.payload;
    },
  }
);
