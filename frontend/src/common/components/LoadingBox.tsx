import React from "react";
import {
  Box,
  BoxProps,
  CircularProgress,
  CircularProgressProps,
} from "@material-ui/core";

type Props = BoxProps & { CircularProgressProps?: CircularProgressProps };

export default ({ CircularProgressProps, ...props }: Props) => {
  return (
    <Box textAlign="center" color="text.secondary" {...props}>
      <CircularProgress color="inherit" {...CircularProgressProps} />
    </Box>
  );
};
