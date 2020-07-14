import { Box, Typography } from "@material-ui/core";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import Poster from "./Poster";

export default ({ movies, title, BoxProps, PosterProps }) => {
  return (
    <React.Fragment>
      {title && (
        <Box paddingLeft={2} paddingBottom={1}>
          <Typography style={{ fontWeight: "bold" }}>{title}</Typography>
        </Box>
      )}
      <HorizontalScroll paddingLeft={2} marginBottom={2} {...BoxProps}>
        {movies.map((movie) => (
          <Poster
            key={movie.creditId || movie.id}
            movie={movie}
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
