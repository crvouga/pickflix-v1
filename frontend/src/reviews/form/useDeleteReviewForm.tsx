import { useQueryCache } from "react-query";
import { SimpleEventTarget } from "../../utils";
import { deleteReview } from "../query";
import { useDeleteReviewFormState } from "./delete-review-form";

const eventTarget = new SimpleEventTarget<
  "submit" | "submitSuccess" | "submitError"
>();

export default () => {
  const deleteFormState = useDeleteReviewFormState();
  const queryCache = useQueryCache();

  const submit = async ({ reviewId }: { reviewId: string }) => {
    eventTarget.dispatch("submit");
    try {
      await deleteReview({
        reviewId,
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
    ...deleteFormState,
    submit,
    eventTarget,
  };
};
