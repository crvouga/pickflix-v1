import { Box, BoxProps, Typography } from "@material-ui/core";
import React from "react";

interface Props extends BoxProps {}

export default (props: Props) => {
  return (
    <Box
      component={Typography}
      style={{ fontWeight: "bold" }}
      paddingX={2}
      paddingBottom={1}
      {...props}
    />
  );
};
