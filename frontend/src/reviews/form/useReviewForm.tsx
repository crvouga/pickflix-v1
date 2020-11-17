import { useQueryCache } from "react-query";
import { MediaId } from "../../tmdb/types";
import { createEventEmitter } from "../../utils";
import { postReview } from "../query";
import { useReviewFormState } from "./review-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

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
    eventEmitter.emit("submit");

    try {
      await postReview({
        content,
        rating,
        mediaId,
      });
      eventEmitter.emit("submitSuccess");
    } catch (error) {
      eventEmitter.emit("submitError");
      throw error;
    } finally {
      eventEmitter.emit("submitSettled");
      queryCache.invalidateQueries((query) =>
        query.queryKey.includes("reviews")
      );
    }
  };

  return {
    ...reviewFormState,
    submit,
    eventEmitter,
  };
};
