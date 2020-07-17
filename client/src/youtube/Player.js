import React from "react";
import ReactPlayer from "react-player/lib/players/YouTube";
import * as youtubeAPI from "./api";

export default ({ video, ...props }) => {
  return (
    <ReactPlayer
      width="100%"
      height="100%"
      url={youtubeAPI.videoKeyToEmbedURL(video?.key)}
      controls={true}
      config={{
        youtube: youtubeAPI.embedConfig,
      }}
      {...props}
    />
  );
};
