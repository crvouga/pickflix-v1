import { TmdbMediaType, TmdbMedia } from "../../tmdb/types";
import { addReviewMutation, postReview, PostReviewParams } from "../query";
import { useQueryCache } from "react-query";
import useSnackbar from "../../snackbar/useSnackbar";
import { useSelector, useDispatch } from "react-redux";
import { reviewForm } from "../redux/review-form";
import { bindActionCreators } from "redux";

const useReviewFormState = () => {
  const slice = useSelector(reviewForm.selectors.slice);
  const dispatch = useDispatch();
  return {
    ...slice,
    ...bindActionCreators(reviewForm.actions, dispatch),
  };
};

export default () => {
  const reviewFormState = useReviewFormState();
  const queryCache = useQueryCache();
  const snackbar = useSnackbar();

  const submit = async (params: PostReviewParams) => {
    try {
      await postReview(params);

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
