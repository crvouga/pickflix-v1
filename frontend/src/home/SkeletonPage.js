import { Box, Divider, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { AspectRatio } from "react-aspect-ratio";
import PosterScrollSkeleton from "../movie/components/PosterScrollSkeleton";

const movies = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const BoxProps = { paddingLeft: 2 };

export default () => {
  return (
    <Box overflow="hidden">
      <AspectRatio ratio="16/9">
        <Skeleton animation="wave" variant="rect" width="100%" height="100%" />
      </AspectRatio>
      <PosterScrollSkeleton BoxProps={BoxProps} title movies={movies} />
      <PosterScrollSkeleton BoxProps={BoxProps} title movies={movies} />
      <PosterScrollSkeleton BoxProps={BoxProps} title movies={movies} />
    </Box>
  );
};
