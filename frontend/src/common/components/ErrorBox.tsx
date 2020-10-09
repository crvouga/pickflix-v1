import React from "react";
import { Box, BoxProps, Typography } from "@material-ui/core";

type Props = BoxProps & {
  errorMessage?: string;
};
export default (props: Props) => {
  const { errorMessage = "Error", ...BoxProps } = props;
  return (
    <Box color="error" width="100%" p={4} {...BoxProps}>
      <Typography>{errorMessage}</Typography>
    </Box>
  );
};
