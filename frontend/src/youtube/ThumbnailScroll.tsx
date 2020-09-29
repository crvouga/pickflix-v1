import { Box, BoxProps, Typography } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React from "react";
import AbsolutePositionBox from "../common/components/AbsolutePositionBox";
import HorizontalScroll from "../common/components/HorizontalScroll";
import { MovieVideo } from "../tmdb/types";
import YoutubeThumbnail from "./Thumbnail";

interface Props extends Omit<BoxProps, "onClick"> {
  videos: MovieVideo[];
  onClick: (video: MovieVideo) => void;
}

export default ({ videos, onClick, ...props }: Props) => {
  if (videos.length === 0) {
    return null;
  }

  const handleClick = (clickedVideo: MovieVideo) => () => {
    onClick(clickedVideo);
  };

  return (
    <HorizontalScroll paddingBottom={1} {...props}>
      {videos.map((video) => (
        <Box
          key={video.id}
          width={240}
          marginRight={1}
          onClick={handleClick(video)}
        >
          <Box position="relative">
            <YoutubeThumbnail video={video} />
            <AbsolutePositionBox
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <PlayArrowIcon
                style={{ width: "48px", height: "48px", opacity: 0.7 }}
              />
            </AbsolutePositionBox>
          </Box>

          <Typography variant="subtitle1" color="textSecondary">
            {video.type}
          </Typography>
        </Box>
      ))}
    </HorizontalScroll>
  );
};
