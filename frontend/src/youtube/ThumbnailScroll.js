import { Box, Typography } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React from "react";
import Layer from "../common/components/Layer";
import HorizontalScroll from "../common/components/HorizontalScroll";
import YoutubeThumbnail from "./Thumbnail";

export default ({ videos, onClick, ...props }) => {
  if (videos.length === 0) {
    return null;
  }

  const handleClick = (clickedVideo) => () => {
    onClick(clickedVideo);
  };

  return (
    <HorizontalScroll paddingBottom={1} {...props}>
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
            <Layer display="flex" justifyContent="center" alignItems="center">
              <PlayArrowIcon
                style={{ width: "48px", height: "48px", opacity: 0.7 }}
              />
            </Layer>
          </Box>

          <Typography variant="subtitle1" color="textSecondary">
            {video.type}
          </Typography>
        </Box>
      ))}
    </HorizontalScroll>
  );
};
