import { useQueryCache } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import useSnackbar from "../../snackbar/useSnackbar";
import { postReview, useQueryReviews } from "../query";
import { reviewForm } from "./review-form";
import { useEffect } from "react";
import { SimpleEventTarget } from "../../utils";

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

const eventTarget = new SimpleEventTarget<"submitSuccess" | "submitError">();

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

      eventTarget.dispatch("submitSuccess");
    } catch (error) {
      eventTarget.dispatch("submitError");
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
    eventTarget,
  };
};
