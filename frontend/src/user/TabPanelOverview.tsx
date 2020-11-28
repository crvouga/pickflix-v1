import { Box, Grid, Typography, Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import {
  AutoListCardGridContainer,
  ListCardGridContainer,
} from "../list/lists/card/ListCardGrid";
import { UserAggergation } from "./query";
import ListReviews from "./reviews/ListReviews";
import { useUserPageUi } from "./redux/user-page-ui";
import ReviewCardContainer from "../review/card/ReviewCardContainer";
import { ReviewCardGridContainer } from "../review/card/ReviewCardGrid";

export default ({ user }: { user: UserAggergation }) => {
  const userPageUi = useUserPageUi();
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
            authorId={user.user.id}
            count={user.reviewCount}
            ItemProps={{ xs: 12 }}
            limit={3}
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
