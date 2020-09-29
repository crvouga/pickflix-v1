import { createAction } from "@reduxjs/toolkit";
import { Tag, Status } from "./types";
// document
export const setTags = createAction<Tag[]>("[discover] SET_TAGS");
export const setActiveTags = createAction<Tag[]>("[discover] SET_ACTIVE_TAGS");
export const setResponses = createAction<any[]>("[discover] SET_RESONSES");
export const setStatus = createAction<Status>("[discover] SET_STATUS");
export const setSearchText = createAction<string>("[discover] SET_SEARCH_TEXT");
export const setSearchResults = createAction<any[]>(
  "[discover] SET_SEARCH_RESULTS"
);
export const setSearchStatus = createAction<Status>(
  "[discover] SET_SEARCH_STATUS"
);

// command
export const requestDiscover = createAction("[discover] REQUEST_DISCOVER");
export const requestSearch = createAction("[discover] REQUEST_SEARCH");
export const activateTags = createAction<Tag[]>("[discover] ACTIVATE_TAGS");
export const deactivateTags = createAction<Tag[]>("[discover] DEACTIVATE_TAGS");
export const addTags = createAction<Tag[]>("[discover] ADD_TAGS");
export const subtractTags = createAction<Tag[]>("[discover] SUBTRACT_TAGS");
