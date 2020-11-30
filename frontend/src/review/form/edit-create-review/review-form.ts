import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../app/redux/types";
import { createPayloadReducer } from "../../../app/redux/utils";
import { createEventEmitter } from "../../../common/utility";
import { MediaId } from "../../../media/tmdb/types";
import { postReview, Review } from "../../query";

const name = "reviewForm";

/* 


*/

export type ReviewFormState = {
  review: Partial<Review>;
};

/* 


*/

const initialState: ReviewFormState = {
  review: {},
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
  setReview: createAction<Partial<Review>>(name + "/SET_REVIEW"),
};

/* 


*/

const reducer = createReducer(initialState, {
  [actions.setReview.toString()]: createPayloadReducer("review"),
});

/* 


*/

export const reviewForm = {
  actions,
  reducer,
  selectors,
};

/* 


*/

export const useReviewFormState = () => {
  const slice = useSelector(reviewForm.selectors.slice);
  const dispatch = useDispatch();
  const actions = bindActionCreators(reviewForm.actions, dispatch);
  return {
    ...actions,
    ...slice,
  };
};

/* 


*/

export const eventEmitterReviewForm = createEventEmitter<{
  submit: undefined;
  submitSuccess: Review;
  submitError: undefined;
  submitSettled: undefined;
}>();

/*


*/

export const submitReview = async ({
  mediaId,
  rating,
  content,
}: {
  mediaId: MediaId;
  rating: number;
  content: string;
}) => {
  eventEmitterReviewForm.emit("submit");

  try {
    const review = await postReview({
      content,
      rating,
      mediaId,
    });
    eventEmitterReviewForm.emit("submitSuccess", review);
  } catch (error) {
    eventEmitterReviewForm.emit("submitError");
    throw error;
  } finally {
    eventEmitterReviewForm.emit("submitSettled");
  }
};
