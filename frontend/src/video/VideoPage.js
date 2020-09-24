import {
  Box,
  Collapse,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import ReactPlayer from "react-player/lib/players/YouTube";
import { useDispatch, useSelector } from "react-redux";
import ExpandIcon from "../common/components/ExpandIcon";
import useBoolean from "../common/hooks/useBoolean";
import * as youtubeAPI from "../youtube/api";
import YoutubeSection from "../youtube/Section";
import Playlist from "./Playlist";
import player from "./redux/player";

const useStyles = makeStyles((theme) => ({
  playerContainer: {
    position: "sticky",
    top: 0,
    width: "100%",
    zIndex: theme.zIndex.appBar,
  },
}));

export default () => {
  const classes = useStyles();
  const isPlaylistOpen = useBoolean(false);
  const isPlaying = useSelector(player.selectors.isPlaying);
  const video = useSelector(player.selectors.video);
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(player.actions.play());
  };

  const handlePause = () => {
    dispatch(player.actions.pause());
  };

  const handleProgress = (progress) => {
    dispatch(player.actions.progress(progress));
  };

  return (
    <div>
      {/* <button is="google-cast-button" />
      <google-cast-launcher /> */}
      <AspectRatio ratio="16/9" className={classes.playerContainer}>
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={handleProgress}
          playing={isPlaying}
          url={youtubeAPI.videoKeyToEmbedURL(video?.key)}
          config={{
            youtube: youtubeAPI.embedConfig,
          }}
        />
      </AspectRatio>

      <Paper>
        <Box
          p={2}
          width="100%"
          display="flex"
          flexDirection="row"
          onClick={isPlaylistOpen.toggle}
        >
          <Typography style={{ flex: 1 }}>Playlist</Typography>
          <ExpandIcon expanded={isPlaylistOpen.value} />
        </Box>
        <Collapse in={isPlaylistOpen.value}>
          <Playlist />
        </Collapse>
      </Paper>

      <YoutubeSection videoId={video?.key} />
    </div>
  );
};
