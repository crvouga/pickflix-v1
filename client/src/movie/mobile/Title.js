import React from "react";
import { Box, Typography } from "@material-ui/core";

export default (props) => {
  return (
    <Box
      component={Typography}
      style={{ fontWeight: "bold" }}
      paddingX={2}
      {...props}
    />
  );
};
