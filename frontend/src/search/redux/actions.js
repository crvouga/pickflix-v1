import { createAction } from "@reduxjs/toolkit";

export default {
  setText: createAction("[search] setText"),
  setResponses: createAction("[search] setResponses"),
  setStatus: createAction("[search] setStatus"),
  setRecentlySearched: createAction("[search] setRecentlySearched"),
  //
  fetch: createAction("[search] fetch"),
  chose: createAction("[search] chose"),
};
