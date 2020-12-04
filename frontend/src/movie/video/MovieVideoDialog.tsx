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
import { closeDialog } from "../../common/utility";
import useVideoState from "../../media/video/useVideoState";
import { YoutubeDetailsContainer } from "../../media/youtube/YoutubeVideo";
import { MovieVideoListItem } from "./VideoListItem";

export default (props: DialogProps) => {
  const videoState = useVideoState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <ResponsiveDialog {...props}>
      <AppBar position="sticky" color="default">
        <Box
          display="flex"
          width="100%"
          flexDirection="row-reverse"
          paddingX={2}
          paddingY={1}
        >
          {isMobile && (
            <Button
              size="large"
              color="primary"
              onClick={() => {
                closeDialog(props);
              }}
            >
              Done
            </Button>
          )}
        </Box>

        {/* {videoState.currentVideo && (
          <YoutubeDetailsContainer videoId={videoState.currentVideo.id} />
        )} */}
      </AppBar>
      <List>
        {videoState.playlist.map((video) => (
          <Box
            key={video.key}
            onClick={() => {
              closeDialog(props);
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
