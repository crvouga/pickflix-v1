import React from "react";
import { Box } from "@material-ui/core";

export default (props) => (
  <Box
    position="absolute"
    top={0}
    left={0}
    width="100%"
    height="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
    {...props}
  />
);
