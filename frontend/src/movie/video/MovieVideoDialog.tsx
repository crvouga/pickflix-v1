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
import ResponsiveDialog from "../../common/components/ResponsiveDialog";
import { closeDialog } from "../../utils";
import useVideoState from "../../video/useVideoState";
import { YoutubeVideoListItemContainer } from "./VideoListItem";
import { YoutubeDetailsContainer } from "../../youtube/YoutubeVideo";

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

        {videoState.currentVideo && (
          <YoutubeDetailsContainer videoId={videoState.currentVideo.id} />
        )}
      </AppBar>
      <List>
        {videoState.playlist.map((video) => (
          <Box
            key={video.key}
            onClick={() => {
              closeDialog(props);
              videoState.setCurrentVideo(video);
            }}
          >
            <YoutubeVideoListItemContainer videoId={video.id} />
          </Box>
        ))}
      </List>
    </ResponsiveDialog>
  );
};
