import { Box, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import PosterSkeleton from "./PosterSkeleton";

export default ({ movies, title, BoxProps, PosterProps }) => {
  return (
    <React.Fragment>
      {title && (
        <Box paddingLeft={2} paddingBottom={1}>
          <Skeleton
            animation="wave"
            variant="text"
            width="33.33%"
            height="2em"
          />
        </Box>
      )}
      <HorizontalScroll paddingLeft={2} marginBottom={2} lock {...BoxProps}>
        {movies.map((movie) => (
          <PosterSkeleton
            key={movie.id}
            minWidth={150}
            maxWidth={150}
            marginRight={2}
            {...PosterProps}
          />
        ))}
      </HorizontalScroll>
    </React.Fragment>
  );
};
