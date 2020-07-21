import {
  Box,
  Collapse,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import ExpandIcon from "../common/components/ExpandIcon";
import useBoolean from "../common/hooks/useBoolean";
import Player from "../youtube/Player";
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
  const playing = useSelector(player.selectors.playing);
  const video = useSelector(player.selectors.video);
  const videoKey = video?.key;
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(player.actions.play());
  };

  const handlePause = () => {
    dispatch(player.actions.pause());
  };

  return (
    <Box>
      <AspectRatio ratio="16/9" className={classes.playerContainer}>
        <Player
          onPlay={handlePlay}
          onPause={handlePause}
          playing={playing}
          video={video}
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

      <YoutubeSection videoId={videoKey} />
    </Box>
  );
};
