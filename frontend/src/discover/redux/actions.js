import { createAction } from "@reduxjs/toolkit";

// document
export const setTags = createAction("[discover] SET_TAGS");
export const setActiveTags = createAction("[discover] SET_ACTIVE_TAGS");
export const setResponses = createAction("[discover] SET_RESONSES");
export const setStatus = createAction("[discover] SET_STATUS");
export const setSearchText = createAction("[discover] SET_SEARCH_TEXT");
export const setSearchResults = createAction("[discover] SET_SEARCH_RESULTS");
export const setSearchStatus = createAction("[discover] SET_SEARCH_STATUS");

// command
export const requestDiscover = createAction("[discover] REQUEST_DISCOVER");
export const requestSearch = createAction("[discover] REQUEST_SEARCH");
export const activateTags = createAction("[discover] ACTIVATE_TAGS");
export const deactivateTags = createAction("[discover] DEACTIVATE_TAGS");
export const addTags = createAction("[discover] ADD_TAGS");
export const subtractTags = createAction("[discover] SUBTRACT_TAGS");
