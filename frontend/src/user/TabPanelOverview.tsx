import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import {
  AutoListCardGridContainer,
  ListCardGridContainer,
} from "../list/lists/card/ListCardGrid";
import { ReviewCardGridContainer } from "../review/card/ReviewCardGrid";
import { UserAggergation } from "./query";
import { useUserPageUi } from "./redux/user-page-ui";
import useModal from "../app/modals/useModal";
import useReviewForm from "../review/form/review-form/useReviewForm";

export default ({ user }: { user: UserAggergation }) => {
  const userPageUi = useUserPageUi();
  const reviewFormModal = useModal("ReviewForm");
  const reviewForm = useReviewForm();
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Box p={2}>
          <Typography variant="h5" gutterBottom>
            Auto Lists
          </Typography>

          <AutoListCardGridContainer
            ownerId={user.user.id}
            count={user.autoListCount}
            ItemProps={{ xs: 12 }}
          />
        </Box>
        <Box p={2}>
          <Typography variant="h5" gutterBottom>
            Lists
          </Typography>

          <ListCardGridContainer
            ownerId={user.user.id}
            count={user.listCount}
            limit={3}
            ItemProps={{ xs: 12 }}
            renderOverLimit={() => (
              <Box paddingY={1}>
                <Button
                  size="large"
                  variant="outlined"
                  fullWidth
                  onClick={() => userPageUi.setTabValue("lists")}
                >
                  See All
                </Button>
              </Box>
            )}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
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
            ItemProps={{ xs: 12 }}
            limit={3}
            ReviewCardCallToActionProps={{
              onClick: () => {
                reviewForm.setReview({});
                reviewFormModal.open();
              },
            }}
            renderOverLimit={() => (
              <Box paddingY={1}>
                <Button
                  size="large"
                  variant="outlined"
                  fullWidth
                  onClick={() => userPageUi.setTabValue("reviews")}
                >
                  See All
                </Button>
              </Box>
            )}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
