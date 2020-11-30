import React from "react";
import useModal from "../../../app/modals/useModal";
import NonFullscreenResponsiveDialog from "../../../common/components/NonFullscreenResponsiveDialog";
import { useListener } from "../../../common/utility";
import { eventEmitterReviewForm } from "./review-form";
import ReviewForm from "./ReviewForm";

export default () => {
  const reviewFormModal = useModal("ReviewForm");

  useListener(eventEmitterReviewForm, "submitSuccess", () => {
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
