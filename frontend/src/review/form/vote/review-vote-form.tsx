import {
  createAction,
  createReducer,
  bindActionCreators,
} from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../app/redux/types";
import { createEventEmitter } from "../../../common/utility";
import {
  postReviewVote,
  Review,
  ReviewAggergation,
  ReviewVoteValue,
} from "../../query";
import { ReviewVoteActionProps } from "./ReviewVoteActions";
import { useDebounce } from "use-debounce/lib";

type ReviewVoteState = {
  upVoteCount: number;
  downVoteCount: number;
  voteValue: ReviewVoteValue | null;
};

const reviewVoteReducer = (
  state: ReviewVoteState,
  voteValue: ReviewVoteValue
) => {
  switch (voteValue) {
    case ReviewVoteValue.DOWN:
      switch (state.voteValue) {
        case ReviewVoteValue.UP:
          return {
            ...state,
            upVoteCount: state.upVoteCount - 1,
            downVoteCount: state.downVoteCount + 1,
            voteValue: ReviewVoteValue.DOWN,
          };
        case ReviewVoteValue.DOWN:
          return {
            ...state,
            downVoteCount: state.downVoteCount - 1,
            voteValue: null,
          };
        case null:
          return {
            ...state,
            downVoteCount: state.downVoteCount + 1,
            voteValue: ReviewVoteValue.DOWN,
          };
      }

    case ReviewVoteValue.UP:
      switch (state.voteValue) {
        case ReviewVoteValue.UP:
          return {
            ...state,
            upVoteCount: state.upVoteCount - 1,
            voteValue: null,
          };
        case ReviewVoteValue.DOWN:
          return {
            ...state,
            downVoteCount: state.downVoteCount - 1,
            upVoteCount: state.upVoteCount + 1,
            voteValue: ReviewVoteValue.UP,
          };
        case null:
          return {
            ...state,
            upVoteCount: state.upVoteCount + 1,
            voteValue: ReviewVoteValue.UP,
          };
      }
  }
};

/*


*/

const name: "reviewsVoteForm" = "reviewsVoteForm";

export type ReviewsVoteFormState = {
  [reviewId: string]: ReviewVoteState;
};

const initialState: ReviewsVoteFormState = {};

/*


*/

const actions = {
  setReviewVoteState: createAction(
    name + "/SET_REVIEW_VOTE_STATE",
    (reviewId: string, reviewVoteState: ReviewVoteState) => ({
      payload: {
        reviewId,
        reviewVoteState,
      },
    })
  ),
};

/*


*/

const slice = (state: AppState) => state[name];
const selectors = {
  slice,
  reviewVoteState: (reviewId: string) => (state: AppState) =>
    slice(state)[reviewId],
};

/*


*/

const reducer = createReducer(initialState, {
  [actions.setReviewVoteState.toString()]: (state, action) => {
    const { reviewId, reviewVoteState } = action.payload;
    state[reviewId] = reviewVoteState;
  },
});

/*


*/

export const reviewsVoteForm = {
  reducer,
  selectors,
  actions,
};

/*


*/

const reviewToReviewVoteState = (review: ReviewAggergation) => {
  return {
    upVoteCount: review.reviewUpVoteCount,
    downVoteCount: review.reviewVoteCount - review.reviewUpVoteCount,
    voteValue: review.reviewVoteValue,
  };
};

const useReviewVoteState = (review: ReviewAggergation) => {
  const reviewId = review.review.id;

  const slice = useSelector(reviewsVoteForm.selectors.slice);
  const state = slice[reviewId] || reviewToReviewVoteState(review);

  const dispatch = useDispatch();
  const { setReviewVoteState } = bindActionCreators(
    reviewsVoteForm.actions,
    dispatch
  );
  const setState = (newState: ReviewVoteState) => {
    setReviewVoteState(reviewId, newState);
  };

  const voteUp = () => {
    setState(reviewVoteReducer(state, ReviewVoteValue.UP));
  };

  const voteDown = () => {
    setState(reviewVoteReducer(state, ReviewVoteValue.DOWN));
  };

  return {
    state,
    setState,
    voteUp,
    voteDown,
  };
};

/* 


*/

export const eventEmitterReviewVoteForm = createEventEmitter<{
  submit: undefined;
  submitSuccess: Review;
  submitError: undefined;
  submitSettled: undefined;
}>();

const submit = async (
  review: ReviewAggergation,
  voteValue: ReviewVoteValue | null
) => {
  try {
    eventEmitterReviewVoteForm.emit("submit");
    await postReviewVote({
      reviewId: review.review.id,
      voteValue,
    });
    eventEmitterReviewVoteForm.emit("submitSuccess", review.review);
  } catch (error) {
    eventEmitterReviewVoteForm.emit("submitError");
    throw error;
  } finally {
    eventEmitterReviewVoteForm.emit("submitSettled");
  }
};

export const useReviewVoteActionProps = (review: ReviewAggergation) => {
  const { state, setState, voteDown, voteUp } = useReviewVoteState(review);

  useEffect(() => {
    setState(reviewToReviewVoteState(review));
  }, [review]);

  const [voteValue] = useDebounce(state.voteValue, 1000);
  useEffect(() => {
    submit(review, voteValue);
  }, [voteValue]);

  const reviewVoteActionProps: ReviewVoteActionProps = {
    ...state,
    onVoteUp: voteUp,
    onVoteDown: voteDown,
  };

  return {
    reviewVoteActionProps,
  };
};
