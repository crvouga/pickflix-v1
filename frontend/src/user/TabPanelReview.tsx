import { Box, Typography } from "@material-ui/core";
import React from "react";
import { UserAggergation } from "./query";
import { ReviewCardGridContainer } from "../review/card/ReviewCardGrid";

export default ({ user }: { user: UserAggergation }) => {
  return (
    <React.Fragment>
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>

        <ReviewCardGridContainer
          authorId={user.user.id}
          count={user.reviewCount}
          ReviewCardProps={{ noWrap: true, showMedia: true }}
        />
      </Box>
    </React.Fragment>
  );
};
