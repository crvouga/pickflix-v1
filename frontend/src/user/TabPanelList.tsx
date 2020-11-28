import { Box, Typography } from "@material-ui/core";
import React from "react";
import {
  AutoListCardGridContainer,
  ListCardGridContainer,
} from "../list/lists/card/ListCardGrid";
import { UserAggergation } from "./query";

export default ({ user }: { user: UserAggergation }) => {
  return (
    <React.Fragment>
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          Auto Lists
        </Typography>
        <AutoListCardGridContainer
          ownerId={user.user.id}
          count={user.autoListCount}
        />
      </Box>
      <Box p={2}>
        <Typography variant="h5" gutterBottom>
          Lists
        </Typography>

        <ListCardGridContainer ownerId={user.user.id} count={user.listCount} />
      </Box>
    </React.Fragment>
  );
};
