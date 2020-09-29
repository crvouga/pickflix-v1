import { Box } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import { MovieVideo } from "../tmdb/types";

const renderNameNumberPair = ([name, number]: [string, number]) => (
  <React.Fragment key={name}>
    {`${name} `}
    <Box component="span" color="text.secondary">
      {number}
    </Box>
  </React.Fragment>
);

export const renderText = (videos: MovieVideo[]) => {
  return videos.length === 0
    ? "No Videos"
    : R.pipe(
        R.countBy((video: MovieVideo) => video.type),
        R.toPairs,
        (_) => _.map(renderNameNumberPair),
        //intersperse " • "
        (_) =>
          _.flatMap((element, index, elementArray) =>
            index === elementArray.length - 1 ? [element] : [element, " • "]
          )
      )(videos);
};
