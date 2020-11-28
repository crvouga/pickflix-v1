import { Box, CircularProgress, Zoom } from "@material-ui/core";
import React from "react";
import { useInView } from "react-intersection-observer";

export default ({
  canFetchMore,
  fetchMoreRef,
}: {
  canFetchMore?: boolean;
  fetchMoreRef: (node?: Element | null | undefined) => void;
}) => {
  const [inViewRef, isInView] = useInView();

  return (
    <React.Fragment>
      <Box
        p={6}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Zoom in={isInView && canFetchMore}>
          <CircularProgress disableShrink />
        </Zoom>
      </Box>
      <div ref={inViewRef} />
      <div ref={fetchMoreRef} />
    </React.Fragment>
  );
};
