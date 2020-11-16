import { ReviewAggergation, Review } from "../query";
import useReviewForm from "../form/useReviewForm";
import useDeleteReviewForm from "../form/useDeleteReviewForm";
import useModal from "../../navigation/modals/useModal";

export default () => {
  const reviewForm = useReviewForm();
  const reviewFormModal = useModal("ReviewForm");

  const deleteReviewForm = useDeleteReviewForm();
  const deleteReviewFormModal = useModal("DeleteReviewForm");

  const onEdit = (review: Partial<Review>) => {
    reviewForm.setReview(review);
    reviewFormModal.open();
  };

  const onDelete = (reviewId: string) => {
    deleteReviewForm.setReviewId(reviewId);
    deleteReviewFormModal.open();
  };

  return {
    onEdit,
    onDelete,
  };
};
