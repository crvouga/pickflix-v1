import {
  Box,
  Hidden,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import React, { useEffect } from "react";
import useBoolean from "../../common/hooks/useBoolean";
import { MovieVideo, MovieVideos } from "../../tmdb/types";
import useVideoState from "../../video/useVideoState";
import { YoutubeStatusAlertError } from "../../youtube/YoutubeStatusAlert";
import MovieVideoDialog from "./MovieVideoDialog";
import { MovieVideoListItem } from "./VideoListItem";

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

export default ({
  tmdbMediaId,
  videos,
}: {
  tmdbMediaId: string;
  videos: MovieVideos;
}) => {
  const videoState = useVideoState();
  const isDialogOpen = useBoolean(false);

  useEffect(() => {
    const trailer = videos.results.find((video) => video.type === "Trailer");
    videoState.setCurrentVideo(trailer || videos.results[0]);
    videoState.setPlaylist(videos.results);
    videoState.setError(undefined);
  }, [tmdbMediaId]);

  const handleClick = (video: MovieVideo) => {
    videoState.setCurrentVideo(video);
    videoState.setIsPlaying(true);
  };

  const handleOpen = () => {};

  return (
    <React.Fragment>
      {/* {videoState.error && (
        <Box paddingY={2}>
          <YoutubeStatusAlertError />
        </Box>
      )} */}

      <MovieVideoDialog
        open={isDialogOpen.value}
        onClose={isDialogOpen.setFalse}
      />

      <Paper>
        <ListItem onClick={isDialogOpen.setTrue}>
          <ListItemText
            primaryTypographyProps={{ variant: "h6" }}
            primary="Videos"
            secondary={`${videoState.playlist.length} videos`}
          />
          <ListItemSecondaryAction>
            <UnfoldMoreIcon />
          </ListItemSecondaryAction>
        </ListItem>

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
