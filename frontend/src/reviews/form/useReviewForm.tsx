import { useQueryCache } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import useSnackbar from "../../snackbar/useSnackbar";
import { postReview, useQueryReviews } from "../query";
import { reviewForm } from "./review-form";
import { useEffect } from "react";

const useReviewFormState = () => {
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

class ReviewFormEventTarget extends EventTarget {
  submitSuccess() {
    this.dispatchEvent(new Event("submitSuccess"));
  }
  submitError() {
    this.dispatchEvent(new Event("submitError"));
  }
}
const noop = () => {};

const eventTarget = new ReviewFormEventTarget();

const onSubmitSuccess = (callback: () => void) => {
  eventTarget.addEventListener("submitSuccess", callback);
  return (callback?: () => void) => {
    eventTarget.removeEventListener("submitSuccess", callback || noop);
  };
};

export default () => {
  const reviewFormState = useReviewFormState();
  const queryCache = useQueryCache();
  const snackbar = useSnackbar();

  const queryReview = useQueryReviews({
    mediaId: reviewFormState.review.mediaId,
  });

  const submit = async () => {
    if (!reviewFormState.review.mediaId || reviewFormState.disabled) {
      return;
    }

    try {
      await postReview({
        content: reviewFormState.review.content,
        rating: reviewFormState.review.rating,
        mediaId: reviewFormState.review.mediaId,
      });

      snackbar.display({
        message: "Review posted",
      });

      eventTarget.submitSuccess();
    } catch (error) {
      eventTarget.submitError();
      throw error;
    } finally {
      queryCache.invalidateQueries((query) =>
        query.queryKey.includes("reviews")
      );
    }
  };

  return {
    ...reviewFormState,
    submit,
    onSubmitSuccess,
  };
};
