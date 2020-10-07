import { Box } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

export default () => {
  return (
    <Box paddingX={2} paddingY={1} display="flex" flexDirection="row">
      <Box marginRight={2} display="flex" alignItems="center">
        <Skeleton animation="pulse" variant="circle" width={40} height={40} />
      </Box>
      <Box marginY={1}>
        <Box paddingBottom={1}>
          <Skeleton
            animation="wave"
            variant="rect"
            width={150}
            height="1.2em"
          />
        </Box>
        <Skeleton animation="wave" variant="rect" width={50} height="1em" />
      </Box>
    </Box>
  );
};
