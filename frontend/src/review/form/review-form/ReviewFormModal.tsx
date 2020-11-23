import React from "react";
import useModal from "../../../app/modals/useModal";
import NonFullscreenResponsiveDialog from "../../../common/components/NonFullscreenResponsiveDialog";
import { useListener } from "../../../common/utility";
import ReviewForm from "./ReviewForm";
import useReviewForm from "./useReviewForm";

export default () => {
  const reviewForm = useReviewForm();
  const reviewFormModal = useModal("ReviewForm");

  useListener(reviewForm.eventEmitter, "submitSuccess", () => {
    reviewFormModal.close();
  });

  return (
    <NonFullscreenResponsiveDialog
      open={reviewFormModal.isOpen}
      onClose={reviewFormModal.close}
    >
      <ReviewForm onCancel={reviewFormModal.close} />
    </NonFullscreenResponsiveDialog>
  );
};
