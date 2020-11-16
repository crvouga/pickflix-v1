import {
  createAction,
  createReducer,
  createSelector,
  bindActionCreators,
} from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";
import { MediaId } from "../../tmdb/types";
import { Review } from "../query";
import { useSelector, useDispatch } from "react-redux";

const name = "reviewForm";

/* 

*/

export type ReviewFormState = {
  review: Partial<Review> & Pick<Review, "rating" | "content">;
};

/* 

*/

const initialState: ReviewFormState = {
  review: {
    rating: 0,
    content: "",
    mediaId: undefined,
  },
};

/* 

*/

const slice = (state: AppState) => state.reviewForm;
const review = createSelector([slice], (slice) => slice.review);
const disabled = createSelector(
  [review],
  (review) => !(0 <= review.rating && review.rating <= 5) && !review.mediaId
);
const selectors = {
  slice,
  review,
  disabled,
};

/* 

*/

const actions = {
  setReview: createAction<Partial<Review>>(name + "/SET_REVIEW"),
  reset: createAction(name + "/SET_RESET"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setReview.toString()]: (state, action) => {
    state.review = action.payload;
  },
  [actions.reset.toString()]: (state, action) => {
    return initialState;
  },
});

/* 

*/

export const reviewForm = {
  actions,
  reducer,
  selectors,
};

export const useReviewFormState = () => {
  const slice = useSelector(reviewForm.selectors.slice);
  const dispatch = useDispatch();
  const actions = bindActionCreators(reviewForm.actions, dispatch);
  const review = useSelector(reviewForm.selectors.review);
  const disabled = useSelector(reviewForm.selectors.disabled);
  return {
    ...actions,
    ...slice,
    review,
    disabled,
  };
};
