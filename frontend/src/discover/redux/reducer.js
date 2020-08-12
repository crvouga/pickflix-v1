import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";

const setPayload = (key) => (state, action) => {
  state[key] = action.payload;
};

export default createReducer(
  {
    tags: [],
    activeTags: [],
    responses: [],
    status: null,
    searchText: "",
    searchResults: [],
    searchStatus: null,
  },
  {
    [actions.setTags]: setPayload("tags"),
    [actions.setActiveTags]: setPayload("activeTags"),
    [actions.setResponses]: setPayload("responses"),
    [actions.setStatus]: setPayload("status"),
    [actions.setSearchText]: setPayload("searchText"),
    [actions.setSearchResults]: setPayload("searchResults"),
    [actions.setSearchStatus]: setPayload("searchStatus"),
  }
);
