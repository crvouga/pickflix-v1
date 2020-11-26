import { Box, Typography } from "@material-ui/core";
import React from "react";

export default () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="240px"
    >
      <Typography align="center" color="textSecondary" variant="h6">
        There's nothing here
      </Typography>
    </Box>
  );
};
