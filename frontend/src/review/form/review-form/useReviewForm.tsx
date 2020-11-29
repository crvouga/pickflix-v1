import { createEventEmitter } from "../../../common/utility";
import { MediaId } from "../../../media/tmdb/types";
import { postReview } from "../../query";
import { useReviewFormState } from "./review-form";

const eventEmitter = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

export default () => {
  const formState = useReviewFormState();

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
    }
  };

  return {
    ...formState,
    submit,
    eventEmitter,
  };
};
