import { createAction } from "@reduxjs/toolkit";

export default {
  setFocused: createAction("[search] SET_FOCUSED"),
  setText: createAction("[search] SET_TEXT"),
  setResponses: createAction("[search] SET_RESPONSES"),
  setStatus: createAction("[search] SET_STATUS"),
  setRecentlySearched: createAction("[search] SET_RECENTLY_SEARCHED"),
  //
  fetch: createAction("[search] FETCH"),
  chose: createAction("[search] CHOSE"),
};
