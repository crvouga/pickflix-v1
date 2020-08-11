import { Box, Typography, CircularProgress } from "@material-ui/core";
import numeral from "numeral";
import * as R from "ramda";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import Poster from "../movie/components/Poster";
import TMDbAttribution from "../tmdb/TMDbAttribution";
import discover from "./redux";
const resultsToFlipKey = R.pipe(R.pluck("id"), R.join(","));

export default () => {
  const results = useSelector(discover.selectors.results);
  const totalResults = useSelector(discover.selectors.totalResults);
  const responseStatus = useSelector(discover.selectors.responseStatus);
  const dispatch = useDispatch();

  const [triggerRef, inView] = useInView();
  const canFetchMore = results.length < totalResults;

  useEffect(() => {
    if (inView && canFetchMore) {
      dispatch(discover.actions.fetch());
    }
  }, [inView]);

  const selectedTags = useSelector(discover.selectors.selectedTags);
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [selectedTags]);

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
        {responseStatus === "loading" && <CircularProgress />}
      </Box>
    </>
  );
};
