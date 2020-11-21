import {
  createAction,
  createReducer,
  bindActionCreators,
} from "@reduxjs/toolkit";
import { AppState } from "../../../app/redux/types";
import { useSelector, useDispatch } from "react-redux";
import { createPayloadReducer } from "../../../app/redux/utils";

const name = "deleteReviewForm";

/* 


*/

export type DeleteReviewFormState = {
  reviewId?: string;
};

/* 


*/

const initialState: DeleteReviewFormState = {};

/* 


*/

const slice = (state: AppState) => state.deleteReviewForm;
const selectors = {
  slice,
};

/* 


*/

const actions = {
  setReviewId: createAction<string | undefined>(name + "/SET_REVIEW_ID"),
};

/* 


*/

const reducer = createReducer(initialState, {
  [actions.setReviewId.toString()]: createPayloadReducer("reviewId"),
});

/* 


*/

export const deleteReviewForm = {
  actions,
  reducer,
  selectors,
};

/* 


*/

export const useDeleteReviewFormState = () => {
  const slice = useSelector(deleteReviewForm.selectors.slice);
  const dispatch = useDispatch();
  const actions = bindActionCreators(deleteReviewForm.actions, dispatch);
  return {
    ...slice,
    ...actions,
  };
};
