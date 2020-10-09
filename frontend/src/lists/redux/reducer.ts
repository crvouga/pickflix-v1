import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { initialState } from "./types";

export default createReducer(initialState, {
  [actions.setListItemInfos.toString()]: (state, action) => {
    state.listItemInfos = action.payload;
  },
});
