import { Box, Divider, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { AspectRatio } from "react-aspect-ratio";

export default () => {
  return (
    <div>
      <AspectRatio ratio="16/9">
        <Skeleton variant="rect" width="100%" height="100%" />
      </AspectRatio>
      <Box p={2}>
        <Typography variant="h5">
          <Skeleton width="50%" />
        </Typography>
        <Typography variant="subtitle1">
          <Skeleton width="33.33%" />
        </Typography>
        <Box paddingBottom={1}>
          <Skeleton width="100%" height="3em" />
        </Box>
        <Box
          paddingBottom={1}
          display="flex"
          justifyContent="space-around"
          flexWrap="nowrap"
        >
          <Skeleton variant="circle" width="4em" height="4em" />
          <Skeleton variant="circle" width="4em" height="4em" />
          <Skeleton variant="circle" width="4em" height="4em" />
          <Skeleton variant="circle" width="4em" height="4em" />
        </Box>
        <Box display="flex" justifyContent="center">
          <Skeleton variant="text" width="50%" height="2em" />
        </Box>
        <Skeleton variant="rect" width="100%" height="7.5em" />
      </Box>
      <Divider />
      <Box paddingX={2} paddingY={1}>
        <Typography variant="h5">
          <Skeleton width="25%" />
        </Typography>
      </Box>
    </div>
  );
};
