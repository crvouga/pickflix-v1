import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../app/redux/types";
import { createPayloadReducer } from "../../../app/redux/utils";
import { createEventEmitter } from "../../../common/utility";
import { deleteReview } from "../../query";

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

/*


*/
export const eventEmitterDeleteReview = createEventEmitter<{
  submit: undefined;
  submitSettled: undefined;
  submitSuccess: undefined;
}>();

/*


*/

export const useDeleteReviewForm = () => {
  const deleteFormState = useDeleteReviewFormState();

  const submit = async ({ reviewId }: { reviewId: string }) => {
    eventEmitterDeleteReview.emit("submit");
    try {
      await deleteReview({
        reviewId,
      });
      eventEmitterDeleteReview.emit("submitSuccess");
    } catch (error) {
      throw error;
    } finally {
      eventEmitterDeleteReview.emit("submitSettled");
    }
  };

  return {
    ...deleteFormState,
    submit,
  };
};
