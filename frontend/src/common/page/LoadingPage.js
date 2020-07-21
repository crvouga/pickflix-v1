import { CircularProgress, Box } from "@material-ui/core";

import React from "react";

export default () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="80vh"
      color="text.secondary"
    >
      <CircularProgress color="inherit" disableShrink size="2em" />
    </Box>
  );
};
