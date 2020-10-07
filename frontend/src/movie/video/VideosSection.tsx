import { Box } from "@material-ui/core";
import React from "react";
import { MovieVideos } from "../../tmdb/types";
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
