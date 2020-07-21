import { Box } from "@material-ui/core";
import * as R from "ramda";
import React from "react";

const renderNameNumberPair = ([name, number]) => (
  <React.Fragment key={name}>
    {`${name} `}
    <Box component="span" color="text.secondary">
      {number}
    </Box>
  </React.Fragment>
);

export const renderText = (videos) =>
  videos.length === 0
    ? "No Videos"
    : R.pipe(
        R.countBy(R.prop("type")),
        R.toPairs,
        R.map(renderNameNumberPair),
        R.intersperse(" • ")
      )(videos);
