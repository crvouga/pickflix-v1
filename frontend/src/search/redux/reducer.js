import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const setPayload = (key) => (state, action) => {
  state[key] = action.payload;
};

export default createReducer(
  {
    focused: true,
    text: "",
    responses: [],
    status: "loading",
    recentlySearched: [],
  },
  {
    [actions.setFocused]: setPayload("focused"),
    [actions.setText]: setPayload("text"),
    [actions.setResponses]: setPayload("responses"),
    [actions.setStatus]: setPayload("status"),
    [actions.setRecentlySearched]: setPayload("recentlySearched"),
  }
);
