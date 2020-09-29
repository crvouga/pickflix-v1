import { Box, BoxProps, ButtonBase, Typography } from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import React from "react";
import { renderText } from "./utilities";
import { MovieVideo } from "../tmdb/types";

interface Props extends BoxProps {
  videos: MovieVideo[];
}

export default ({ videos, ...props }: Props) => {
  const disabled = videos.length === 0 || false;

  return (
    <ButtonBase style={{ width: "100%" }} disabled={disabled}>
      <Box
        color={disabled ? "text.disabled" : "primary"}
        p={2}
        display="flex"
        justifyContent="space-between"
        width="100%"
        textAlign="left"
        {...props}
      >
        <Typography noWrap style={{ fontWeight: "bold", flex: 1 }}>
          {renderText(videos)}
        </Typography>
        <Box color="text.secondary">
          <UnfoldMoreIcon color="inherit" fontSize="small" />
        </Box>
      </Box>
    </ButtonBase>
  );
};
