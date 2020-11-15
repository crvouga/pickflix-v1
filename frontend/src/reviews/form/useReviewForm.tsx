import { useQueryCache } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import useSnackbar from "../../snackbar/useSnackbar";
import { postReview, useQueryReviews } from "../query";
import { reviewForm } from "./review-form";
import { useEffect } from "react";
import { SimpleEventTarget } from "../../utils";
import { MediaId } from "../../tmdb/types";

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

const eventTarget = new SimpleEventTarget<
  "submit" | "submitSuccess" | "submitError"
>();

export default () => {
  const reviewFormState = useReviewFormState();
  const queryCache = useQueryCache();
  const snackbar = useSnackbar();

  const submit = async ({
    mediaId,
    rating,
    content,
  }: {
    mediaId: MediaId;
    rating: number;
    content: string;
  }) => {
    try {
      await postReview({
        content,
        rating,
        mediaId,
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
