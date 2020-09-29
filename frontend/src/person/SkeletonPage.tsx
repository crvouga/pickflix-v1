import { Box, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

export default () => {
  return (
    <Box overflow="hidden">
      <Box textAlign="center" p={2}>
        <Skeleton
          style={{ display: "inline-block" }}
          animation="wave"
          variant="circle"
          width="144px"
          height="144px"
        />
      </Box>

      {/* Header Text */}
      <Box paddingX={2}>
        <Typography variant="h4">
          <Skeleton animation="wave" width="33.33%" />
        </Typography>
        <Typography variant="subtitle1">
          <Skeleton animation="wave" width="16em" />
        </Typography>
      </Box>

      {/* Known For Section */}
      <Box paddingX={2} paddingTop={1}>
        <Box paddingBottom={1}>
          <Skeleton animation="wave" variant="text" width="25%" height="2em" />
        </Box>
        <Skeleton animation="wave" variant="rect" width="100%" height="7.5em" />
      </Box>
    </Box>
  );
};
