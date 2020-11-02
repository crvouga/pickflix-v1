import {
  Box,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import React, { useEffect, useState } from "react";
import { MovieVideo, MovieVideos } from "../../tmdb/types";
import useVideoState from "../../video/useVideoState";
import { YoutubeStatusAlertError } from "../../youtube/YoutubeStatusAlert";
import {
  MovieVideoListItem,
  YoutubeVideoListItemContainer,
} from "./VideoListItem";
import MovieVideoDialog from "./MovieVideoDialog";
import useBoolean from "../../common/hooks/useBoolean";

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

export default ({ videos }: { videos: MovieVideos }) => {
  const videoState = useVideoState();
  const isDialogOpen = useBoolean(false);

  useEffect(() => {
    videoState.setCurrentVideo(videos.results[0]);
    videoState.setPlaylist(videos.results);
    videoState.setError(undefined);
  }, []);

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

      <MovieVideoDialog
        open={isDialogOpen.value}
        onClose={isDialogOpen.setFalse}
      />

      <Paper>
        <List>
          <ListItem button onClick={isDialogOpen.setTrue}>
            <ListItemText
              primaryTypographyProps={{ variant: "h6" }}
              primary="Videos"
              secondary={`${videoState.playlist.length} videos`}
            />
            <ListItemSecondaryAction>
              <UnfoldMoreIcon />
            </ListItemSecondaryAction>
          </ListItem>

          {/* {videoState.currentVideo && (
            <YoutubeVideoListItemContainer
              videoId={videoState.currentVideo.key}
            />
          )} */}
        </List>

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
