import { Box, Chip } from "@material-ui/core";
import React from "react";
import HorizontalScroll from "./HorizontalScroll";

const getLabelDefault = (chip) => chip.label;

export default ({ chips, getLabel = getLabelDefault, ...props }) => {
  return (
    <HorizontalScroll {...props}>
      {chips.map((chip) => (
        <Box key={chip.id} marginRight={1}>
          <Chip label={getLabel(chip)} variant="outlined" />
        </Box>
      ))}
    </HorizontalScroll>
  );
};
