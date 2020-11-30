import React from "react";
import useModal from "../../../app/modals/useModal";
import { useReviewFormState } from "../../form/edit-create-review/review-form";
import { Review } from "../../query";
import {
  ReviewCardCallToAction,
  ReviewCardCallToActionProps,
} from "./ReviewCardCallToAction";

export default ({
  ReviewCardCallToActionProps,
  partialReview,
}: {
  ReviewCardCallToActionProps?: ReviewCardCallToActionProps;
  partialReview: Partial<Review>;
}) => {
  const reviewFormModal = useModal("ReviewForm");
  const { setReview } = useReviewFormState();

  return (
    <ReviewCardCallToAction
      onClick={() => {
        setReview(partialReview);
        reviewFormModal.open();
      }}
      {...ReviewCardCallToActionProps}
    />
  );
};
