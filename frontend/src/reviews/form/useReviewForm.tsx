import { useQueryCache } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import useSnackbar from "../../snackbar/useSnackbar";
import { postReview, ReviewAggergation } from "../query";
import { reviewForm } from "./review-form";

const useReviewFormState = () => {
  const slice = useSelector(reviewForm.selectors.slice);
  const dispatch = useDispatch();
  const actions = bindActionCreators(reviewForm.actions, dispatch);

  const disabled = !(1 <= slice.rating && slice.rating <= 5);

  const setReview = (review: ReviewAggergation) => {
    actions.setContent(review.review.content);
    actions.setRating(review.review.rating);
    actions.setMediaId(review.review.mediaId);
  };
  return {
    ...actions,
    ...slice,
    setReview,
    disabled,
  };
};

export default () => {
  const reviewFormState = useReviewFormState();
  const queryCache = useQueryCache();
  const snackbar = useSnackbar();

  const submit = async () => {
    if (!reviewFormState.mediaId || reviewFormState.disabled) {
      return;
    }

    try {
      await postReview({
        content: reviewFormState.content,
        rating: reviewFormState.rating,
        mediaId: reviewFormState.mediaId,
      });
      snackbar.display({
        message: "Review posted",
      });
    } catch (error) {
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
  };
};
