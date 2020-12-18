import { Box, DialogProps, List } from "@material-ui/core";
import React from "react";
import { ResponsiveDialog } from "../../common/components/ResponsiveDialog";
import { closeModal } from "../../common/utility";
import useVideoState from "../../media/video/useVideoState";
import { MovieVideoListItem } from "./VideoListItem";

export default (props: DialogProps) => {
  const videoState = useVideoState();

  return (
    <ResponsiveDialog {...props} showDoneButton>
      <List>
        {videoState.playlist.map((video) => (
          <Box
            key={video.key}
            p={1 / 2}
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
