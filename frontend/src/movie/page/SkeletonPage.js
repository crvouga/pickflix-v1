import { Box, Divider, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { AspectRatio } from "react-aspect-ratio";

export default () => {
  return (
    <Box overflow="hidden">
      {/* <AspectRatio ratio="16/9">
        <Skeleton animation="wave" variant="rect" width="100%" height="100%" />
      </AspectRatio> */}
      <AspectRatio ratio="16/9">
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
            width="5em"
            height="5em"
          />
        </Box>
      </AspectRatio>
      <Box p={2}>
        <Typography variant="h5">
          <Skeleton animation="wave" width="50%" />
        </Typography>
        <Typography variant="subtitle1">
          <Skeleton animation="wave" width="33.33%" />
        </Typography>
        <Box paddingBottom={1}>
          <Skeleton animation="wave" width="100%" height="3em" />
        </Box>
        <Box
          paddingBottom={1}
          display="flex"
          justifyContent="space-around"
          flexWrap="nowrap"
        >
          <Skeleton
            animation="wave"
            variant="circle"
            width="4em"
            height="4em"
          />
          <Skeleton
            animation="wave"
            variant="circle"
            width="4em"
            height="4em"
          />
          <Skeleton
            animation="wave"
            variant="circle"
            width="4em"
            height="4em"
          />
          <Skeleton
            animation="wave"
            variant="circle"
            width="4em"
            height="4em"
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Skeleton animation="wave" variant="text" width="50%" height="2em" />
        </Box>
        <Skeleton animation="wave" variant="rect" width="100%" height="7.5em" />
      </Box>
      <Divider />
    </Box>
  );
};
