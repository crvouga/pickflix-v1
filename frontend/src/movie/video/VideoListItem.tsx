import { Box, ButtonBase, List, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import moment from "moment";
import numeral from "numeral";
import React from "react";
import { MovieVideo } from "../../media/tmdb/types";
import {
  useQueryYoutubeVideoDetails,
  videoKeyToThumbnailURL,
  YoutubeVideo,
} from "../../media/youtube/query";

export const toViewCount = (video: Partial<YoutubeVideo>) =>
  numeral(video?.statistics?.viewCount)
    .format("0.0")
    .replace(".0", "")
    .toUpperCase();

export const toPublishedAt = (video: Partial<YoutubeVideo>) =>
  moment(video?.snippet?.publishedAt, "YYYYMMDD")
    .fromNow()
    .replace("a ", "1 ")
    .replace(" ago", "");

export const VideoListItem = ({
  image,
  title,
  subtitle,
  selected,
}: {
  image?: string;
  title?: string;
  subtitle?: string;
  selected?: boolean;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      component={ButtonBase}
      textAlign="center"
      width="100%"
      paddingX={2}
      paddingY={1}
      bgcolor={selected ? "action.selected" : "transparent"}
    >
      <Box
        minWidth={`${(1 / 3) * 100}%`}
        maxWidth={`${(1 / 3) * 100}%`}
        marginRight={1}
      >
        <Box
          paddingTop="56.25%"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></Box>
      </Box>

      <Box
        minWidth={`${(2 / 3) * 100}%`}
        maxWidth={`${(2 / 3) * 100}%`}
        textAlign="left"
        marginBottom="auto"
      >
        <Typography noWrap>{title}</Typography>
        <Typography color="textSecondary">{subtitle}</Typography>
      </Box>
    </Box>
  );
};

export const VideoListItemSkeleton = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      width="100%"
      paddingX={2}
      paddingY={1}
    >
      <Box
        minWidth={`${(1 / 3) * 100}%`}
        maxWidth={`${(1 / 3) * 100}%`}
        marginRight={1}
      >
        <Skeleton variant="rect" width="100%" height="100%">
          <Box paddingTop="56.25%"></Box>
        </Skeleton>
      </Box>

      <Box
        minWidth={`${(2 / 3) * 100}%`}
        maxWidth={`${(2 / 3) * 100}%`}
        textAlign="left"
        marginBottom="auto"
      >
        <Skeleton variant="text" width="80%" height="1.75em" />
        <Skeleton variant="text" width="50%" height="1.75em" />
      </Box>
    </Box>
  );
};

const toThumbnail = (video: Partial<YoutubeVideo>) =>
  video &&
  video.snippet &&
  (Object.values(video.snippet.thumbnails)[2]?.url ||
    Object.values(video.snippet.thumbnails)[1]?.url ||
    Object.values(video.snippet.thumbnails)[0]?.url ||
    (video.id && videoKeyToThumbnailURL(video.id)));

export const YoutubeVideoListItem = ({
  video,
}: {
  video: Partial<YoutubeVideo>;
}) => {
  const subtitle = [
    `${toViewCount(video)} views`,
    `${toPublishedAt(video)} old`,
  ].join(" · ");
  return (
    <VideoListItem
      image={toThumbnail(video)}
      title={video?.snippet?.title}
      subtitle={subtitle}
    />
  );
};

export const MovieVideoListItem = ({
  video,
  selected,
}: {
  selected?: boolean;
  video: MovieVideo;
}) => {
  const videoKey = video?.key
  return (
    <VideoListItem
      selected={selected}
      image={videoKey ? videoKeyToThumbnailURL(videoKey) : undefined}
      title={video.name}
      subtitle={video.type}
    />
  );
};

export const YoutubeVideoListItemContainer = ({
  videoId,
}: {
  videoId?: string;
}) => {
  const query = useQueryYoutubeVideoDetails({ videoId });
  if (query.error) {
    return null;
  }

  if (!videoId || !query.data) {
    return <VideoListItemSkeleton />;
  }

  const video = query.data.items[0];

  if (!video) {
    return <VideoListItemSkeleton />;
  }

  return <YoutubeVideoListItem video={video} />;
};

export const MovieVideoList = ({
  selectedVideo,
  videos,
  onClick,
}: {
  selectedVideo?: MovieVideo;
  videos: MovieVideo[];
  onClick?: (video: MovieVideo) => void;
}) => {
  return (
    <List>
      {videos.map((video) => (
        <Box
          key={video.key}
          p={1 / 2}
          onClick={() => {
            if (onClick) {
              onClick(video);
            }
          }}
        >
          <MovieVideoListItem
            selected={selectedVideo?.key === video.key}
            video={video}
          />
        </Box>
      ))}
    </List>
  );
};
