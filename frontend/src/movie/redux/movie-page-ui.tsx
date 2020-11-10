import { createAction, createReducer } from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";

const name = "moviePageUi";

/*

*/

export type MoviePageUiState = {
  isVideoPlayerSticky: boolean;
  reviewCommentsTabIndex: number;
};

const initialState: MoviePageUiState = {
  isVideoPlayerSticky: true,
  reviewCommentsTabIndex: 0,
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
  setReviewCommentsTabIndex: createAction<number>(
    name + "/SET_REVIEW_COMMENTS_TAB_INDEX"
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
  [actions.setReviewCommentsTabIndex.toString()]: (state, action) => {
    state.reviewCommentsTabIndex = action.payload;
  },
});

/* 

*/

export const moviePageUi = {
  selectors,
  actions,
  reducer,
};
