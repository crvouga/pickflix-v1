import { TmdbMediaType, TmdbMedia } from "../../tmdb/types";
import { addReviewMutation, postReview } from "../query";
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

  const submit = async ({
    content,
    rating,
    tmdbMedia,
  }: {
    tmdbMedia: TmdbMedia;
    rating: number;
    content: string;
  }) => {
    try {
      const review = await postReview({
        ...tmdbMedia,
        content,
        rating,
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
