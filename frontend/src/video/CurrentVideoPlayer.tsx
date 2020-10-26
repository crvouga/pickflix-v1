import { makeStyles } from "@material-ui/core";
import React from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { useDispatch, useSelector } from "react-redux";
import AspectRatio from "../common/components/AspectRatio";
import * as youtubeAPI from "../youtube/api";
import { video } from "./redux/video";
import { APP_BAR_HEIGHT } from "../navigation/NavigationBarTopLevel";

const useStyles = makeStyles((theme) => ({
  playerContainer: {
    position: "sticky",
    top: APP_BAR_HEIGHT,
    width: "100%",
    zIndex: theme.zIndex.appBar,
  },
}));

type Props = ReactPlayerProps & {};

export default (props: Props) => {
  const classes = useStyles();
  const isPlaying = useSelector(video.selectors.isPlaying);
  const currentVideo = useSelector(video.selectors.currentVideo);
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(video.actions.setIsPlaying(true));
  };

  const handlePause = () => {
    dispatch(video.actions.setIsPlaying(false));
  };

  return (
    <AspectRatio
      ratio={[16, 9]}
      ContainerProps={{ className: classes.playerContainer }}
    >
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        onPlay={handlePlay}
        onPause={handlePause}
        playing={isPlaying}
        url={youtubeAPI.videoKeyToEmbedURL(currentVideo?.key)}
        config={{
          youtube: youtubeAPI.embedConfig,
        }}
        {...props}
      />
    </AspectRatio>
  );
};
