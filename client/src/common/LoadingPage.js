import { CircularProgress, Box } from "@material-ui/core";

import React from "react";

export default () => {
  return (
    <Box textAlign="center" marginTop={12} color="text.secondary">
      <CircularProgress color="inherit" disableShrink size="2em" />
    </Box>
  );
};
