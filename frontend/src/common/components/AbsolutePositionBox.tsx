import { Box, BoxProps } from "@material-ui/core";
import React from "react";

export default (props: BoxProps) => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      {...props}
    />
  );
};
