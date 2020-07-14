import React from "react";
import ReactPlayer from "react-player/lib/players/YouTube";
import * as youtubeAPI from "./api";

export default ({ video, ...props }) => {
  const url = youtubeAPI.videoKeyToEmbedURL(video?.key);

  return (
    <ReactPlayer
      id="player"
      width="100%"
      height="100%"
      url={url}
      controls={true}
      config={{
        youtube: youtubeAPI.embedConfig,
      }}
      {...props}
    />
  );
};
