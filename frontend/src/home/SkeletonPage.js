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
      <AspectRatio ratio="16/9" style={{ width: "100%" }}>
        <Box
          display="flex"
          flexDirection="column-reverse"
          paddingX={2}
          paddingY={3}
          width="100%"
        >
          <Typography variant="subtitle1">
            <Skeleton animation="wave" width="2.5em" />
          </Typography>
          <Typography variant="h5">
            <Skeleton animation="wave" width="6em" />
          </Typography>
        </Box>
      </AspectRatio>
      <PosterScrollSkeleton BoxProps={BoxProps} title movies={movies} />
      <PosterScrollSkeleton BoxProps={BoxProps} title movies={movies} />
      <PosterScrollSkeleton BoxProps={BoxProps} title movies={movies} />
    </Box>
  );
};
