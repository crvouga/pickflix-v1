import { createAction, createReducer } from "@reduxjs/toolkit";
import { AppState } from "../../app/redux/types";

const name = "moviePageUi";

/*

*/

export type ReviewCommentsTabValue = "pickflix" | "youtube" | "tmdb";
export const reviewCommentsTabOrder: ["pickflix", "youtube", "tmdb"] = [
  "pickflix",
  "youtube",
  "tmdb",
];

export type moviePageUi = {
  isVideoPlayerSticky: boolean;
  reviewCommentsTabValue: ReviewCommentsTabValue;
};

const initialState: moviePageUi = {
  isVideoPlayerSticky: false,
  reviewCommentsTabValue: "youtube",
};

/* 

*/

const slice = (state: AppState) => state.moviePageUi;
const selectors = {
  slice,
};

/* 

*/

const actions = {
  setReviewCommentsTabValue: createAction<ReviewCommentsTabValue>(
    name + "/SET_REVIEW_COMMENTS_TAB_VALUE"
  ),
  setIsVideoPlayerSticky: createAction<boolean>(
    name + "/SET_IS_VIDEO_PLAYER_STICKY"
  ),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setIsVideoPlayerSticky.toString()]: (state, action) => {
    state.isVideoPlayerSticky = action.payload;
  },
  [actions.setReviewCommentsTabValue.toString()]: (state, action) => {
    state.reviewCommentsTabValue = action.payload;
  },
});

/* 

*/

export const moviePageUi = {
  selectors,
  actions,
  reducer,
};
