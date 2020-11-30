import { Box, Typography } from "@material-ui/core";
import React from "react";
import useModal from "../app/modals/useModal";
import { ReviewCardGridContainer } from "../review/card/ReviewCardGridContainer";
import { useReviewFormState } from "../review/form/edit-create-review/review-form";
import { UserAggergation } from "./query";

export default ({ user }: { user: UserAggergation }) => {
  const reviewFormModal = useModal("ReviewForm");
  const reviewFormState = useReviewFormState();
  return (
    <React.Fragment>
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>

        <ReviewCardGridContainer
          GetReviewParams={{
            userId: user.user.id,
            authorId: user.user.id,
          }}
          count={user.reviewCount}
          ReviewCardCallToActionProps={{
            onClick: () => {
              reviewFormModal.open();
              reviewFormState.setReview({});
            },
          }}
          ReviewCardProps={{ noWrap: true, showMedia: true }}
        />
      </Box>
    </React.Fragment>
  );
};
