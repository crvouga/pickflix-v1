import {
  createAction,
  createReducer,
  bindActionCreators,
} from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";
import { useSelector, useDispatch } from "react-redux";

const name = "deleteReviewForm";

/* 

*/

export type DeleteReviewFormState = {
  reviewId?: string;
};

/* 

*/

const initialState: DeleteReviewFormState = {
  reviewId: undefined,
};

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
  [actions.setReviewId.toString()]: (state, action) => {
    state.reviewId = action.payload;
  },
});

/* 

*/

export const deleteReviewForm = {
  actions,
  reducer,
  selectors,
};

export const useDeleteReviewFormState = () => {
  const slice = useSelector(deleteReviewForm.selectors.slice);
  const dispatch = useDispatch();
  const actions = bindActionCreators(deleteReviewForm.actions, dispatch);
  return {
    ...slice,
    ...actions,
  };
};
