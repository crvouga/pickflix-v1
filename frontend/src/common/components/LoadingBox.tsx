import React from "react";
import { Box, BoxProps, CircularProgress } from "@material-ui/core";

type Props = BoxProps & { size?: string | number };

export default ({ size = "2em", ...props }: Props) => {
  return (
    <Box textAlign="center" color="text.secondary" {...props}>
      <CircularProgress color="inherit" size={size} />
    </Box>
  );
};
