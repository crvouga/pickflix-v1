import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer(
  {
    text: "",
    responses: [],
    status: "loading",
    recentlySearched: [],
  },
  {
    [actions.setText]: (state, action) => {
      state.text = action.payload;
    },
    [actions.setResponses]: (state, action) => {
      state.responses = action.payload;
    },
    [actions.setStatus]: (state, action) => {
      state.status = action.payload;
    },
    [actions.setRecentlySearched]: (state, action) => {
      state.recentlySearched = action.payload;
    },
  }
);
