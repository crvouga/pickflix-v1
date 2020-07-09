import {
  Box,
  ButtonBase,
  Collapse,
  makeStyles,
  Typography,
  Paper,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import AspectRatio from "../common/AspectRatio";
import ExpandIcon from "../common/ExpandIcon";
import useBoolean from "../common/useBoolean";
import Player from "./Player";
import Playlist from "./Playlist";
import player from "./redux/player";

import YoutubeVideoSection from "../youtube/Section";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    backgroundColor: theme.palette.background.default,
  },
  noComment: {
    marginTop: theme.spacing(2),
  },
  commentsContainer: {
    display: "block",
  },
  commentsTitle: {
    padding: theme.spacing(1),
  },
  commentIcon: {
    marginTop: "0.5em",
    width: "0.7em",
    height: "0.7em",
  },
  playerContainer: {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: theme.zIndex.appBar,
  },
}));

export default () => {
  const classes = useStyles();
  const video = useSelector(player.selectors.video);
  const videoKey = video?.key;
  const isPlaylistOpen = useBoolean(false);

  return (
    <div className={classes.root}>
      <AspectRatio ratio={[16, 9]} className={classes.playerContainer}>
        <Player />
      </AspectRatio>

      {/* white space */}
      <AspectRatio ratio={[16, 9]} width="100%" />

      <Paper>
        <ButtonBase
          component={Box}
          paddingX={2}
          paddingY={2}
          width="100%"
          display="flex"
          flexDirection="row"
          onClick={isPlaylistOpen.toggle}
        >
          <Typography style={{ flex: 1 }}>Playlist</Typography>
          <ExpandIcon
            style={{ zIndex: 1000 }}
            expanded={isPlaylistOpen.value}
          />
        </ButtonBase>

        <Collapse in={isPlaylistOpen.value}>
          <Playlist />
        </Collapse>
      </Paper>

      <YoutubeVideoSection videoId={videoKey} />
    </div>
  );
};
