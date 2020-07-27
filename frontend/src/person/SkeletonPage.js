import { Box, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { AspectRatio } from "react-aspect-ratio";
import HorizontalScroll from "../common/components/HorizontalScroll";
import Poster from "../movie/components/Poster";

export default () => {
  return (
    <Box overflow="hidden">
      {/* Header Section */}
      <AspectRatio ratio="21/9">
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Skeleton
            animation="wave"
            variant="circle"
            width="144px"
            height="144px"
          />
        </Box>
      </AspectRatio>

      {/* Header Text */}
      <Box paddingX={2} paddingTop={3}>
        <Typography variant="h4">
          <Skeleton animation="wave" width="33.33%" />
        </Typography>
        <Typography variant="subtitle1">
          <Skeleton animation="wave" width="16em" />
        </Typography>
      </Box>
      <Box paddingLeft={2} paddingBottom={1}>
        <Skeleton animation="wave" width="120px" height="2em" />
      </Box>

      {/* Known For Section */}
      <HorizontalScroll paddingLeft={2}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((movie, index) => (
          <Poster key={index} movie={movie} marginRight={2} />
        ))}
      </HorizontalScroll>
      <Box paddingX={2}>
        <Box paddingBottom={1}>
          <Skeleton animation="wave" variant="text" width="25%" height="2em" />
        </Box>
        <Skeleton animation="wave" variant="rect" width="100%" height="7.5em" />
      </Box>
    </Box>
  );
};
