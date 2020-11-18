import useModal from "../../navigation/modals/useModal";
import useDeleteReviewForm from "../form/delete-review/useDeleteReviewForm";
import useReviewForm from "../form/review-form/useReviewForm";
import { Review } from "../query";

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
