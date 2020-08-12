import { Box } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import Poster from "../movie/components/Poster";
import discover from "./redux";

export default () => {
  const results = useSelector(discover.selectors.discoverResults);
  const canRequestMoreDiscover = useSelector(
    discover.selectors.canRequestMoreDiscover
  );

  const dispatch = useDispatch();

  const [triggerRef, inView] = useInView();

  useEffect(() => {
    if (inView && canRequestMoreDiscover) {
      dispatch(discover.actions.requestDiscover());
    }
  }, [inView]);

  const activeTags = useSelector(discover.selectors.activeTags);
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [activeTags]);

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-around"
        p={1 / 2}
        ref={ref}
      >
        {results.map((result) => (
          <Box p={1 / 2} width="50%" key={result.id}>
            <Poster movie={result} width="100%" />
          </Box>
        ))}
        <div ref={triggerRef} />
      </Box>
    </>
  );
};
