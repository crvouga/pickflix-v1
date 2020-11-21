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
  if (videos.length === 0) {
    return "No Videos";
  }

  const countByVideo = R.countBy((video) => video.type, videos);

  return Object.entries(countByVideo)
    .map(renderNameNumberPair)
    .flatMap(
      (element: JSX.Element, index: number, elementArray: JSX.Element[]) =>
        index === elementArray.length - 1 ? [element] : [element, " • "]
    );
};
