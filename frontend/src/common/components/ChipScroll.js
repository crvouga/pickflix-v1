import { Box, Chip } from "@material-ui/core";
import React from "react";
import HorizontalScroll from "./HorizontalScroll";

const getLabelDefault = (chip) => chip.label;

export default ({
  chips,
  getLabel = getLabelDefault,
  BoxProps,
  ChipProps,
  ChipBoxProps,
}) => {
  return (
    <HorizontalScroll {...BoxProps}>
      {chips.map((chip) => (
        <Box key={chip.id || getLabel(chip)} marginRight={1} {...ChipBoxProps}>
          <Chip label={getLabel(chip)} variant="outlined" {...ChipProps} />
        </Box>
      ))}
    </HorizontalScroll>
  );
};
