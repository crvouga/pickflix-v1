import useModal from "../../../app/modals/useModal";
import useDeleteReviewForm from "../../form/delete-review/useDeleteReviewForm";
import { useReviewFormState } from "../../form/edit-create-review/review-form";
import { ReviewAggergation } from "../../query";
import { ReviewActionsProps } from "./ReviewActions";

export default (review: ReviewAggergation) => {
  const { setReview } = useReviewFormState();
  const reviewFormModal = useModal("ReviewForm");

  const deleteReviewForm = useDeleteReviewForm();
  const deleteReviewFormModal = useModal("DeleteReviewForm");

  const onEdit = () => {
    setReview(review.review);
    reviewFormModal.open();
  };

  const onDelete = () => {
    deleteReviewForm.setReviewId(review.review.id);
    deleteReviewFormModal.open();
  };

  const reviewActionProps: ReviewActionsProps = {
    onEdit,
    onDelete,
  };

  return {
    reviewActionProps,
  };
};
