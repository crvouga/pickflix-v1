import React from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import player from "./redux/player";
import * as youtubeAPI from "./youtubeAPI";

export default (props) => {
  const playing = useSelector(player.selectors.playing);
  const video = useSelector(player.selectors.video);
  const dispatch = useDispatch();
  const handlePlay = () => {
    dispatch(player.actions.play());
  };
  const handlePause = () => {
    dispatch(player.actions.pause());
  };
  const url = youtubeAPI.videoKeyToEmbedURL(video?.key);

  return (
    <ReactPlayer
      id="player"
      width="100%"
      height="100%"
      playing={playing}
      onPlay={handlePlay}
      onPause={handlePause}
      url={url}
      controls={true}
      config={{
        youtube: youtubeAPI.embedConfig,
      }}
      {...props}
    />
  );
};
