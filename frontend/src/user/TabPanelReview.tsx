import { Box, Typography } from "@material-ui/core";
import React from "react";
import { UserAggergation } from "./query";
import { ReviewCardGridContainer } from "../review/card/ReviewCardGrid";
import useReviewForm from "../review/form/review-form/useReviewForm";
import useModal from "../app/modals/useModal";

export default ({ user }: { user: UserAggergation }) => {
  const reviewFormModal = useModal("ReviewForm");
  const reviewForm = useReviewForm();
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
              reviewForm.setReview({});
            },
          }}
          ReviewCardProps={{ noWrap: true, showMedia: true }}
        />
      </Box>
    </React.Fragment>
  );
};
