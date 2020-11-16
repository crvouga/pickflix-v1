import { useQueryCache } from "react-query";
import { MediaId } from "../../tmdb/types";
import { SimpleEventTarget } from "../../utils";
import { postReview } from "../query";
import { useReviewFormState } from "./review-form";

const eventTarget = new SimpleEventTarget<
  "submit" | "submitSuccess" | "submitError"
>();

export default () => {
  const reviewFormState = useReviewFormState();
  const queryCache = useQueryCache();

  const submit = async ({
    mediaId,
    rating,
    content,
  }: {
    mediaId: MediaId;
    rating: number;
    content: string;
  }) => {
    eventTarget.dispatch("submit");
    try {
      await postReview({
        content,
        rating,
        mediaId,
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
