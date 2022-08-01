import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper
} from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import React, { useEffect } from "react";
import useModal from "../../app/modals/useModal";
import { MovieVideos } from "../../media/tmdb/types";
import useVideoState from "../../media/video/useVideoState";
import MovieVideoDialog from "./MovieVideoDialog";

export default ({
  tmdbMediaId,
  videos,
}: {
  tmdbMediaId: string;
  videos: MovieVideos;
}) => {
  const videoState = useVideoState();
  const { open, isOpen, close } = useModal("MovieVideo");

  const videoResults = videos?.results ?? []

  useEffect(() => {
    videoState.setPlaylist(videoResults);
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
            button
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
      </Paper>
    </React.Fragment>
  );
};
