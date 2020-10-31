import {
  Box,
  Hidden,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  IconButton,
  Divider,
  ListItemIcon,
} from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import React from "react";
import { MovieVideo } from "../../tmdb/types";
import useVideoState from "../../video/useVideoState";
import { YoutubeStatusAlertError } from "../../youtube/YoutubeStatusAlert";
import {
  MovieVideoListItem,
  YoutubeVideoListItemContainer,
} from "./VideoListItem";

const VIDEO_MAX_LENGTH = 3;

const VideosScroll = ({
  videos,
  onVideoClick,
}: {
  videos: MovieVideo[];
  onVideoClick: (video: MovieVideo) => void;
}) => {
  return (
    <React.Fragment>
      <Box overflow="scroll" maxHeight="360px">
        <List>
          {videos.map((video) => (
            <Box key={video.key} onClick={() => onVideoClick(video)}>
              <MovieVideoListItem video={video} />
            </Box>
          ))}
        </List>
      </Box>
    </React.Fragment>
  );
};

export default () => {
  const videoState = useVideoState();

  const handleClick = (video: MovieVideo) => {
    videoState.setCurrentVideo(video);
    videoState.setIsPlaying(true);
  };

  const handleOpen = () => {};

  return (
    <React.Fragment>
      {videoState.error && (
        <Box paddingY={2}>
          <YoutubeStatusAlertError />
        </Box>
      )}

      <Paper>
        <List>
          <ListItem button>
            <ListItemText
              primaryTypographyProps={{ variant: "h6" }}
              primary="Videos"
              secondary={`${videoState.playlist.length} videos`}
            />
            <ListItemSecondaryAction>
              <UnfoldMoreIcon />
            </ListItemSecondaryAction>
          </ListItem>

          {videoState.currentVideo && (
            <YoutubeVideoListItemContainer
              videoId={videoState.currentVideo.key}
            />
          )}
        </List>

        <Divider />

        <Hidden xsDown>
          <VideosScroll
            videos={videoState.playlist}
            onVideoClick={handleClick}
          />
        </Hidden>
      </Paper>
    </React.Fragment>
  );
};
