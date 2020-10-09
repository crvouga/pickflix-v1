import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export type Result = (
  | {
      mediaType: "movie";
      posterPath: string;
      title: string;
    }
  | {
      mediaType: "person";
      profilePath: string;
      name: string;
    }
) & {
  [k: string]: any;
};

export type Response = {
  results: Result[];
} & {
  [k: string]: any;
};

export type Status = "loading" | "success" | "error";

export type SearchState = {
  focused: boolean;
  text: string;
  responses: Response[];
  status: Status;
  recentlySearched: Result[];
};

export const initialState: SearchState = {
  focused: true,
  text: "",
  responses: [],
  status: "loading",
  recentlySearched: [],
};

export default createReducer(initialState, {
  [actions.setFocused.toString()]: (state, action) => {
    state.focused = action.payload;
  },
  [actions.setText.toString()]: (state, action) => {
    state.text = action.payload;
  },
  [actions.setResponses.toString()]: (state, action) => {
    state.responses = action.payload;
  },
  [actions.setStatus.toString()]: (state, action) => {
    state.status = action.payload;
  },
  [actions.setRecentlySearched.toString()]: (state, action) => {
    state.recentlySearched = action.payload;
  },
});
