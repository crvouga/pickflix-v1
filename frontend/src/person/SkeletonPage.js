import { Box, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { AspectRatio } from "react-aspect-ratio";
import HorizontalScroll from "../common/components/HorizontalScroll";
import PosterSkeleton from "../movie/components/PosterSkeleton";
import PosterScrollSkeleton from "../movie/components/PosterScrollSkeleton";

export default () => {
  return (
    <Box overflow="hidden">
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
      <Box paddingX={2} paddingTop={3} paddingBottom={1}>
        <Typography variant="h4">
          <Skeleton animation="wave" width="33.33%" />
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          <Skeleton animation="wave" width="80%" />
        </Typography>
        <Skeleton animation="wave" variant="rect" width="100%" height="7.5em" />
      </Box>
      <PosterScrollSkeleton title movies={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
    </Box>
  );
};
