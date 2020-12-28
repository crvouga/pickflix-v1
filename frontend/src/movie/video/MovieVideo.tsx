import {
  Box,
  Button,
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
import { MovieVideoList, MovieVideoListItem } from "./VideoListItem";

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
          <MovieVideoList
            selectedVideo={videoState.currentVideo}
            videos={videoState.playlist.slice(0, 3)}
            onClick={videoState.selectVideo}
          />
          {videoState.playlist.length > 3 && (
            <Box p={2} paddingTop={0}>
              <Button
                size="large"
                variant="outlined"
                fullWidth
                onClick={() => {
                  open();
                }}
              >
                See All
              </Button>
            </Box>
          )}
        </Hidden>
      </Paper>
    </React.Fragment>
  );
};
