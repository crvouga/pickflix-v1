import { createAction } from "@reduxjs/toolkit";
import { Response, Result, Status } from "./types";

export default {
  setFocused: createAction<boolean>("[search] SET_FOCUSED"),
  setText: createAction<string>("[search] SET_TEXT"),
  setResponses: createAction<Response[]>("[search] SET_RESPONSES"),
  setStatus: createAction<Status>("[search] SET_STATUS"),
  setRecentlySearched: createAction<Result[]>("[search] SET_RECENTLY_SEARCHED"),
  //
  fetch: createAction("[search] FETCH"),
  chose: createAction<Result>("[search] CHOSE"),
};
