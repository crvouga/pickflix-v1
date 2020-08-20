import * as actions from "./actions";
import { createReducer } from "@reduxjs/toolkit";

const setPayload = (key) => (state, action) => {
  state[key] = action.payload;
};

const reducer = createReducer(
  {
    lists: [],
  },
  {
    [actions.setLists]: setPayload("lists"),
  }
);

export default reducer;
