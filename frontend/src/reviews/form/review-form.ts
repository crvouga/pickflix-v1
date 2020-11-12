import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";
import { TmdbMedia, TmdbMediaType, MediaId } from "../../tmdb/types";

const name = "reviewForm";

/* 

*/

export type ReviewFormState = {
  mediaId?: MediaId;
  rating: number;
  content: string;
};

/* 

*/

const initialState: ReviewFormState = {
  rating: 0,
  content: "",
  mediaId: undefined,
};

/* 

*/

const slice = (state: AppState) => state.reviewForm;
const selectors = {
  slice,
};

/* 

*/

const actions = {
  setRating: createAction<number>(name + "/SET_RATING"),
  setContent: createAction<string>(name + "/SET_CONTENT"),
  setMediaId: createAction<MediaId>(name + "/SET_MEDIA"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setRating.toString()]: (state, action) => {
    state.rating = action.payload;
  },
  [actions.setContent.toString()]: (state, action) => {
    state.content = action.payload;
  },
  [actions.setMediaId.toString()]: (state, action) => {
    state.mediaId = action.payload;
  },
});

/* 

*/

export const reviewForm = {
  actions,
  reducer,
  selectors,
};
