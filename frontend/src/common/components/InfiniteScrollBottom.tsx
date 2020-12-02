import { Box, CircularProgress, Zoom } from "@material-ui/core";
import React from "react";
import { useInView } from "react-intersection-observer";
import LoadingBox from "./LoadingBox";

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
      <Zoom in={isInView && canFetchMore}>
        <LoadingBox p={6} />
      </Zoom>
      <div ref={inViewRef} />
      <div ref={fetchMoreRef} />
    </React.Fragment>
  );
};
