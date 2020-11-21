import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../app/redux/types";
import { createPayloadReducer } from "../../../app/redux/utils";
import { Review } from "../../query";

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
