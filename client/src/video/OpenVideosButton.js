import { Box, ButtonBase, Typography } from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import React from "react";
import { renderText } from "./utilities";

export default ({ videos, ...props }) => {
  const disabled = videos.length === 0 || false;

  return (
    <Box
      color={disabled ? "text.disabled" : "primary"}
      disabled={disabled}
      p={2}
      display="flex"
      justifyContent="space-between"
      {...props}
    >
      <Typography noWrap style={{ fontWeight: "bold", flex: 1 }}>
        {renderText(videos)}
      </Typography>
      <Box color="text.secondary">
        <UnfoldMoreIcon color="inherit" fontSize="small" />
      </Box>
    </Box>
  );
};
