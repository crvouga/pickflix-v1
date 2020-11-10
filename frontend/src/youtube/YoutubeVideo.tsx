import { Box, ButtonBase, Collapse, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import moment from "moment";
import numeral from "numeral";
import React from "react";
import ExpandIcon from "../common/components/ExpandIcon";
import MarkdownTypography from "../common/components/MarkdownTypography";
import useBoolean from "../common/hooks/useBoolean";
import { YoutubeVideo, useQueryYoutubeVideoDetails } from "./query";

export const toViewCount = (video: Partial<YoutubeVideo>) =>
  numeral(video?.statistics?.viewCount).format("0,0");

export const toPublishedAt = (video: Partial<YoutubeVideo>) =>
  moment(video?.snippet?.publishedAt, "YYYYMMDD")
    .fromNow()
    .replace("a ", "1 ")
    .replace(" ago", "");

export const YoutubeTitle = ({ video }: { video?: YoutubeVideo }) => {
  if (!video) {
    return (
      <Box>
        <Skeleton variant="text" width="100%" height="2.5em" />
        <Skeleton variant="text" width="20%" height="1.5em" />
      </Box>
    );
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

export const YoutubeDescription = ({ video }: { video?: YoutubeVideo }) => {
  if (!video) {
    return null;
  }

  return (
    <MarkdownTypography variant="body2" color="textSecondary">
      {video.snippet.description}
    </MarkdownTypography>
  );
};
export const YoutubeDetails = ({ video }: { video?: YoutubeVideo }) => {
  const expanded = useBoolean(false);

  return (
    <Box>
      <ButtonBase onClick={expanded.toggle} style={{ width: "100%" }}>
        <Box p={2} display="flex" textAlign="left" width="100%">
          <Box flex={1}>
            <YoutubeTitle video={video} />
          </Box>
          <Box p={2} display="flex" justifyContent="center" alignItems="center">
            <ExpandIcon expanded={expanded.value} />
          </Box>
        </Box>
      </ButtonBase>
      <Collapse in={expanded.value}>
        <Box p={2} paddingTop={0}>
          <YoutubeDescription video={video} />
        </Box>
      </Collapse>
    </Box>
  );
};

export const YoutubeDetailsContainer = ({ videoId }: { videoId: string }) => {
  const query = useQueryYoutubeVideoDetails({ videoId });
  if (query.error) {
    return null;
  }
  return <YoutubeDetails video={query.data?.items[0]} />;
};
