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
import useModal from "../../app/modals/useModal";
import { MovieVideo, MovieVideos } from "../../media/tmdb/types";
import useVideoState from "../../media/video/useVideoState";
import MovieVideoDialog from "./MovieVideoDialog";
import { MovieVideoListItem } from "./VideoListItem";

const VideosScroll = ({
  videos,
  onVideoClick,
}: {
  videos: MovieVideo[];
  onVideoClick: (video: MovieVideo) => void;
}) => {
  return (
    <React.Fragment>
      <Box overflow="scroll" maxHeight="360px" p={1 / 2}>
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
  const { open, isOpen, close } = useModal("MovieVideo");

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

  if (videoState.playlist.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <MovieVideoDialog
        open={isOpen}
        onClose={() => {
          close();
        }}
      />

      <Paper>
        <List disablePadding>
          <ListItem
            onClick={() => {
              open();
            }}
          >
            <ListItemText
              primaryTypographyProps={{ variant: "h6" }}
              primary="Videos"
              secondary={`${videoState.playlist.length} videos`}
            />
            <ListItemSecondaryAction>
              <UnfoldMoreIcon />
            </ListItemSecondaryAction>
          </ListItem>
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
