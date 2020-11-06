import { TmdbMediaType } from "../../tmdb/types";
import { addReviewMutation } from "../query";
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
  const { tmdbMedia } = reviewFormState;
  const queryCache = useQueryCache();
  const snackbar = useSnackbar();
  const submit = async ({ content }: { content: string }) => {
    if (!tmdbMedia) {
      throw new Error("tmdbMedia required");
    }

    try {
      await addReviewMutation(queryCache)({
        ...tmdbMedia,
        content,
      });

      snackbar.display({
        message: "Review posted",
      });
    } catch (error) {
      throw error;
    } finally {
    }
  };

  return {
    ...reviewFormState,
    submit,
  };
};
