import { Box } from "@material-ui/core";
import React from "react";
import { MediaId } from "../../media/tmdb/types";
import { ReviewCardGridContainer } from "../../review/card/ReviewCardGridContainer";
import { useReviewFormState } from "../../review/form/edit-create-review/review-form";
import useModal from "../../app/modals/useModal";

export default ({ mediaId }: { mediaId: MediaId }) => {
  const reviewFormState = useReviewFormState();
  const reviewFormModal = useModal("ReviewForm");

  return (
    <Box paddingX={2}>
      <ReviewCardGridContainer
        ItemProps={{ xs: 12 }}
        ReviewCardProps={{ showMedia: false, showAuthor: true }}
        GetReviewParams={{ mediaId }}
        ReviewCardCallToActionProps={{
          onClick: () => {
            reviewFormState.setReview({ mediaId });
            reviewFormModal.open();
          },
        }}
      />
    </Box>
  );
};
