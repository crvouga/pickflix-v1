import {
  AppBar,
  Box,
  Button,
  DialogProps,
  List,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { ResponsiveDialog } from "../../common/components/ResponsiveDialog";
import { closeModal } from "../../common/utility";
import useVideoState from "../../media/video/useVideoState";
import { YoutubeDetailsContainer } from "../../media/youtube/YoutubeVideo";
import { MovieVideoListItem } from "./VideoListItem";

export default (props: DialogProps) => {
  const videoState = useVideoState();

  return (
    <ResponsiveDialog {...props} showDoneButton>
      <List>
        {videoState.playlist.map((video) => (
          <Box
            key={video.key}
            onClick={() => {
              closeModal(props);
              videoState.setCurrentVideo(video);
              videoState.setIsPlaying(true);
              videoState.setLight();
            }}
          >
            <MovieVideoListItem video={video} />
          </Box>
        ))}
      </List>
    </ResponsiveDialog>
  );
};
