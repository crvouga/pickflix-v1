import { createAction, createReducer } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../app/redux/types";
import { ReviewAggergation, VoteValue } from "../../query";
import { ReviewVoteActionProps } from "./ReviewVoteActions";

export type VoteState = {
  upVoteCount: number;
  downVoteCount: number;
  voteValue: VoteValue | null;
};

export const voteReducer = (state: VoteState, voteValue: VoteValue) => {
  switch (voteValue) {
    case VoteValue.DOWN:
      switch (state.voteValue) {
        case VoteValue.UP:
          return {
            ...state,
            upVoteCount: state.upVoteCount - 1,
            downVoteCount: state.downVoteCount + 1,
            voteValue: VoteValue.DOWN,
          };
        case VoteValue.DOWN:
          return {
            ...state,
            downVoteCount: state.downVoteCount - 1,
            voteValue: null,
          };
        case null:
          return {
            ...state,
            downVoteCount: state.downVoteCount + 1,
            voteValue: VoteValue.DOWN,
          };
      }

    case VoteValue.UP:
      switch (state.voteValue) {
        case VoteValue.UP:
          return {
            ...state,
            upVoteCount: state.upVoteCount - 1,
            voteValue: null,
          };
        case VoteValue.DOWN:
          return {
            ...state,
            downVoteCount: state.downVoteCount - 1,
            upVoteCount: state.upVoteCount + 1,
            voteValue: VoteValue.UP,
          };
        case null:
          return {
            ...state,
            upVoteCount: state.upVoteCount + 1,
            voteValue: VoteValue.UP,
          };
      }
  }
};

/*


*/

const name: "reviewVoteStates" = "reviewVoteStates";

export type ReviewVoteStatesState = {
  [reviewId: string]: VoteState;
};

const initialState: ReviewVoteStatesState = {};

/*


*/

const actions = {
  vote: createAction(
    name + "/VOTE",
    (review: ReviewAggergation, voteValue: VoteValue) => ({
      payload: {
        review,
        voteValue,
      },
    })
  ),
  setVoteState: createAction(
    name + "/SET_VOTE_STATE",
    (reviewId: string, voteState: VoteState) => ({
      payload: {
        reviewId,
        voteState,
      },
    })
  ),
};

/*


*/

const reviewToVoteState = (review: ReviewAggergation) => {
  return {
    upVoteCount: review.reviewUpVoteCount,
    downVoteCount: review.reviewVoteCount - review.reviewUpVoteCount,
    voteValue: review.reviewVoteValue,
  };
};

const slice = (state: AppState) => state[name];
const selectors = {
  slice,
  voteState: (review: ReviewAggergation) => (state: AppState) =>
    slice(state)[review.review.id] || reviewToVoteState(review),
};

/*


*/

const reducer = createReducer(initialState, {
  [actions.setVoteState.toString()]: (state, action) => {
    const { reviewId, voteState } = action.payload;
    state[reviewId] = voteState;
  },
});

/*


*/

export const reviewVoteStates = {
  reducer,
  selectors,
  actions,
};

/*


*/

export const useReviewVoteActionProps = (review: ReviewAggergation) => {
  const voteState = useSelector(reviewVoteStates.selectors.voteState(review));

  const dispatch = useDispatch();

  const onVoteUp = () => {
    dispatch(reviewVoteStates.actions.vote(review, VoteValue.UP));
  };
  const onVoteDown = () => {
    dispatch(reviewVoteStates.actions.vote(review, VoteValue.DOWN));
  };

  const reviewVoteActionProps: ReviewVoteActionProps = {
    voteValue: voteState.voteValue,
    upVoteCount: voteState.upVoteCount,
    downVoteCount: voteState.downVoteCount,
    onVoteUp,
    onVoteDown,
  };

  return {
    reviewVoteActionProps,
  };
};
