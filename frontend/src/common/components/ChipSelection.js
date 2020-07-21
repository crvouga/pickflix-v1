import { Box, Chip } from "@material-ui/core";
import React from "react";
import HorizontalScroll from "./HorizontalScroll";

export default ({
  chips,
  selected,
  getKey = (x) => x,
  getLabel = (x) => x,
  onSelect,
  BoxProps,
  ChipProps,
}) => {
  return (
    <HorizontalScroll {...BoxProps}>
      {chips.map((chip) => (
        <Box
          key={getKey(chip)}
          marginRight={1 / 2}
          component={Chip}
          label={getLabel(chip)}
          clickable
          onClick={() => onSelect(chip)}
          variant={getKey(chip) === getKey(selected) ? "default" : "outlined"}
          {...ChipProps}
        ></Box>
      ))}
    </HorizontalScroll>
  );
};
