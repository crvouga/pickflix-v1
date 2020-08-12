import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";

const setPayload = (key) => (state, action) => {
  state[key] = action.payload;
};

export default createReducer(
  {
    tags: [],
    activeTags: [],
    discoverResponses: [],
    searchText: "",
    searchResults: [],
  },
  {
    [actions.setTags]: setPayload("tags"),
    [actions.setActiveTags]: setPayload("activeTags"),
    [actions.setDiscoverResponses]: setPayload("discoverResponses"),
    [actions.setSearchText]: setPayload("searchText"),
    [actions.setSearchResults]: setPayload("searchResults"),
  }
);
