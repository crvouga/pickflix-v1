import React from "react";
import { MovieVideoType, MovieVideos } from "../../tmdb/types";
import { Box } from "@material-ui/core";
import WatchVideosButton from "./WatchVideosButton";

type Props = {
  videos: MovieVideos;
};

export default (props: Props) => {
  const { videos } = props;

  return (
    <Box paddingX={2}>
      <WatchVideosButton videos={videos} />
    </Box>
  );
};
