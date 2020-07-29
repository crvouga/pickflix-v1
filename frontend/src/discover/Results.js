import { Box, Typography } from "@material-ui/core";
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
  const status = useSelector(discover.selectors.status);
  const dispatch = useDispatch();
  const ref = useRef();
  const [triggerRef, inView] = useInView();
  const canFetchMore = results.length < totalResults;

  useEffect(() => {
    if (inView && canFetchMore) {
      dispatch(discover.actions.fetch());
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <Box p={1} paddingBottom={0}>
        <Typography variant="subtitle2" color="textSecondary">
          Total Results {numeral(totalResults).format("0,0")}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-around"
      >
        {results.map((result) => (
          <Box p={1} width="50%" key={result.id}>
            <Poster movie={result} width="100%" />
          </Box>
        ))}

        {(status === "loading" || (!canFetchMore && results.length === 0)) &&
          R.range(0, 12).map((_, index) => (
            <Box p={1} width="50%" key={index}>
              <Poster key={index} skeleton width="100%" />
            </Box>
          ))}
        <div ref={triggerRef} />

        <TMDbAttribution />
      </Box>
    </div>
  );
};
