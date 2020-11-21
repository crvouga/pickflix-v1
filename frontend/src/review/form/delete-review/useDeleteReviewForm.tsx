import { useQueryCache } from "react-query";
import { createEventEmitter } from "../../../common/utility";
import { deleteReview } from "../../query";
import { useDeleteReviewFormState } from "./delete-review-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

export default () => {
  const deleteFormState = useDeleteReviewFormState();
  const queryCache = useQueryCache();

  const submit = async ({ reviewId }: { reviewId: string }) => {
    eventEmitter.emit("submit");
    try {
      await deleteReview({
        reviewId,
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
    ...deleteFormState,
    submit,
    eventEmitter,
  };
};
