import {
  AppBar,
  Box,
  Button,
  DialogProps,
  List,
  Typography,
  useMediaQuery,
  IconButton,
  useTheme,
  ButtonBase,
  Collapse,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import moment from "moment";
import numeral from "numeral";
import React from "react";
import ResponsiveDialog from "../../common/components/ResponsiveDialog";
import { MovieVideo } from "../../tmdb/types";
import useVideoState from "../../video/useVideoState";
import { useQueryYoutubeVideoDetails, YoutubeVideo } from "../../youtube/query";
import { MovieVideoListItem } from "./VideoListItem";
import ExpandIcon from "../../common/components/ExpandIcon";
import useBoolean from "../../common/hooks/useBoolean";
import MarkdownTypography from "../../common/components/MarkdownTypography";

export const toViewCount = (video: Partial<YoutubeVideo>) =>
  numeral(video?.statistics?.viewCount).format("0,0");

export const toPublishedAt = (video: Partial<YoutubeVideo>) =>
  moment(video?.snippet?.publishedAt, "YYYYMMDD")
    .fromNow()
    .replace("a ", "1 ")
    .replace(" ago", "");

const handleClose = (props: DialogProps) => {
  if (props.onClose) {
    props.onClose({}, "backdropClick");
  }
};

const YoutubeTitle = ({ videoId }: { videoId: string }) => {
  const query = useQueryYoutubeVideoDetails({
    videoId,
  });

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return (
      <Box>
        <Skeleton variant="text" width="100%" height="2.5em" />
        <Skeleton variant="text" width="20%" height="1.5em" />
      </Box>
    );
  }

  const video = query.data.items[0];

  if (!video) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h5">{video.snippet.title}</Typography>
      <Typography variant="subtitle1">
        {[`${toViewCount(video)} views`, toPublishedAt(video)].join(" · ")}
      </Typography>
    </Box>
  );
};

const YoutubeDescription = ({ videoId }: { videoId: string }) => {
  const query = useQueryYoutubeVideoDetails({
    videoId,
  });

  if (query.error || !query.data) {
    return null;
  }

  const video = query.data.items[0];

  if (!video) {
    return null;
  }

  return (
    <MarkdownTypography variant="body2" color="textSecondary">
      {video.snippet.description}
    </MarkdownTypography>
  );
};

const YoutubeDetails = ({ videoId }: { videoId: string }) => {
  const expanded = useBoolean(false);

  return (
    <Box>
      <ButtonBase onClick={expanded.toggle} style={{ width: "100%" }}>
        <Box p={2} display="flex" textAlign="left" width="100%">
          <Box flex={1}>
            <YoutubeTitle videoId={videoId} />
          </Box>
          <Box p={2} display="flex" justifyContent="center" alignItems="center">
            <ExpandIcon expanded={expanded.value} />
          </Box>
        </Box>
      </ButtonBase>
      <Collapse in={expanded.value}>
        <Box p={2} paddingTop={0}>
          <YoutubeDescription videoId={videoId} />
        </Box>
      </Collapse>
    </Box>
  );
};

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
              onClick={() => handleClose(props)}
            >
              Done
            </Button>
          )}
        </Box>

        {videoState.currentVideo && (
          <YoutubeDetails videoId={videoState.currentVideo.key} />
        )}
      </AppBar>
      <List>
        {videoState.playlist.map((video) => (
          <Box
            key={video.key}
            onClick={() => {
              handleClose(props);
              videoState.setCurrentVideo(video);
            }}
          >
            <MovieVideoListItem video={video} />
          </Box>
        ))}
      </List>
    </ResponsiveDialog>
  );
};
