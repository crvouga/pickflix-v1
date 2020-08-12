import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import Poster from "../movie/components/Poster";
import discover from "./redux";

const useScrollToTopRef = () => {
  const activeTags = useSelector(discover.selectors.activeTags);
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [activeTags]);
  return ref;
};

const useInifiniteScrollRef = () => {
  const canRequestMoreDiscover = useSelector(
    discover.selectors.canRequestMoreDiscover
  );
  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && canRequestMoreDiscover) {
      dispatch(discover.actions.requestDiscover());
    }
  }, [inView]);
  return ref;
};

export default () => {
  const triggerRef = useInifiniteScrollRef();
  const scrollRef = useScrollToTopRef();

  const results = useSelector(discover.selectors.results);
  const status = useSelector(discover.selectors.status);

  if (results.length === 0 && status === "success") {
    return (
      <Box p={8}>
        <Typography
          align="center"
          color="textSecondary"
          variant="h6"
          style={{ fontWeight: "bold" }}
        >
          No results
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={scrollRef}
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      alignContent="center"
    >
      {results.map((result) => (
        <Box p={1 / 2} width="50%" key={result.id}>
          <Poster movie={result} width="100%" />
        </Box>
      ))}
      <div ref={triggerRef} />
    </Box>
  );
};
