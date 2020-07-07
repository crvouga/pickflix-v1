import * as youtubeAPI from "./youtubeAPI";
import {
  AppBar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import AspectRatio from "../common/AspectRatio";
import useBoolean from "../common/useBoolean";
import OpenVideosButton from "./OpenVideosButton";
import Player from "./Player";
import Playlist from "./Playlist";
import player from "./redux/player";
import UnderPlayerDrawer from "./UnderPlayerDrawer";
import YoutubeCommentThreads from "./YoutubeCommentThreads";
import YoutubeSection from "./YoutubeSection";
import YoutubeVideoDetails from "./YoutubeVideoDetails";
import SwipeableViews from "react-swipeable-views";

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
    position: "sticky",
    top: 0,
    zIndex: theme.zIndex.appBar,
    width: "100%",
    backgroundColor: "black",
  },
}));

export default ({ videos }) => {
  const classes = useStyles();
  const video = useSelector(player.selectors.video);
  const dispatch = useDispatch();

  useEffect(() => {
    const isCurrentVideoInPlaylist = videos
      .map((_) => _.key)
      .includes(video?.key);

    if (!isCurrentVideoInPlaylist) {
      dispatch(player.actions.setVideo(videos[0]));
    }
  }, [videos[0]?.key]);

  const videoKey = useSelector((state) => player.selectors.video(state)?.key);

  const [index, setIndex] = useState(0);
  const handleChange = (e, newIndex) => setIndex(newIndex);
  const handleChangeIndex = setIndex;

  const handlePlaylistVideoClick = (clickedVideo) => {
    if (clickedVideo.key === video?.key) {
      dispatch(player.actions.toggle());
    } else {
      setIndex(0);
      dispatch(player.actions.setVideo(clickedVideo));
      dispatch(player.actions.play());
    }
  };

  const youtubeQuery = useQuery(
    ["youtube", videoKey],
    async () => {
      if (!videoKey) {
        return Promise.resolve({
          video: {},
          commentThreadList: {},
        });
      }
      const [video, commentThreadList] = await Promise.all([
        youtubeAPI.video({ videoId: videoKey }),
        youtubeAPI.commentThreadList({ videoId: videoKey }),
      ]);

      return {
        video,
        commentThreadList,
      };
    },
    {}
  );
  const isPlaylistOpen = useBoolean(false);
  return (
    <div className={classes.root}>
      <AspectRatio ratio={[16, 9]} className={classes.playerContainer}>
        <Player />
      </AspectRatio>
      {/* <UnderPlayerDrawer
        open={isPlaylistOpen.value}
        onClose={isPlaylistOpen.setFalse}
      >
        <AppBar position="sticky" color="default">
          <Toolbar variant="dense">
            <IconButton onClick={isPlaylistOpen.setFalse}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div>
          <Playlist onVideoClick={handlePlaylistVideoClick} videos={videos} />
        </div>
      </UnderPlayerDrawer>
      <OpenVideosButton videos={videos} onClick={isPlaylistOpen.setTrue} /> */}

      <Tabs
        indicatorColor="primary"
        variant="fullWidth"
        value={index}
        onChange={handleChange}
      >
        <Tab label="Info" />
        <Tab label="Playlist" />
      </Tabs>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        {index === 0 && (
          <div>
            {youtubeQuery.status === "loading" && (
              <Box
                color="text.secondary"
                width="100%"
                textAlign="center"
                marginTop={6}
              >
                <CircularProgress disableShrink color="inherit" size="2em" />
              </Box>
            )}
            {youtubeQuery.status === "error" && (
              <JSONPretty data={youtubeQuery.data} />
            )}
            {youtubeQuery.status === "success" && (
              <YoutubeSection youtubeData={youtubeQuery.data} />
            )}
          </div>
        )}
        {index === 1 && (
          <Playlist onVideoClick={handlePlaylistVideoClick} videos={videos} />
        )}
      </SwipeableViews>
    </div>
  );
};
