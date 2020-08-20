import { createReducer } from "@reduxjs/toolkit";

const setPayload = (key) => (state, action) => {
  state[key] = action.payload;
};

const reducer = createReducer(
  {
    lists: {},
  },
  {
    [actions.setLists]: setPayload("list"),
  }
);

export default reducer;
