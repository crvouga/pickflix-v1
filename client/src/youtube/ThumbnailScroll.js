import { Box, Typography } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React from "react";
import Cover from "../common/components/Cover";
import HorizontalScroll from "../common/components/HorizontalScroll";
import YoutubeThumbnail from "./Thumbnail";

export default ({ videos, onClick, ...props }) => {
  if (videos.length === 0) {
    return null;
  }

  const handleClick = (clickedVideo) => {
    onClick(clickedVideo);
  };

  return (
    <HorizontalScroll {...props}>
      {videos.map((video) => (
        <Box
          key={video.id}
          maxWidth={240}
          minWidth={240}
          marginRight={1}
          onClick={handleClick(video)}
        >
          <Box position="relative">
            <YoutubeThumbnail video={video} />
            <Cover>
              <Box
                component={PlayArrowIcon}
                width={48}
                height={48}
                style={{ opacity: 0.7 }}
              />
            </Cover>
          </Box>

          <Typography variant="subtitle2" color="textSecondary">
            {video.type}
          </Typography>
        </Box>
      ))}
    </HorizontalScroll>
  );
};
