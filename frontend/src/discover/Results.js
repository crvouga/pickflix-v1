import { Box, CircularProgress, Typography } from "@material-ui/core";
import numeral from "numeral";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import Poster from "../movie/components/Poster";
import discover from "./redux/discover";
import { Flipper, Flipped } from "react-flip-toolkit";

import * as R from "ramda";
const resultsToFlipKey = R.pipe(R.pluck("id"), R.join(","));

export default () => {
  const results = useSelector(discover.selectors.results);
  const totalResults = useSelector(discover.selectors.totalResults);
  const status = useSelector(discover.selectors.status);
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      dispatch(discover.actions.fetch());
    }
  }, [inView]);

  return (
    <div>
      <Box p={1} paddingBottom={0}>
        {totalResults > 0 && (
          <Typography variant="subtitle2" color="textSecondary">
            Total Results {numeral(totalResults).format("0,0")}
          </Typography>
        )}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-around"
      >
        {results.map((result) => (
          <Box p={1} width="50%" key={result.id}>
            <Poster movie={result} ImageProps={{ sizeIndex: 4 }} />
          </Box>
        ))}
        <Box width="100%" textAlign="center" m={2}>
          {status === "loading" && <CircularProgress disableShrink />}
        </Box>
        <div ref={ref} />
      </Box>
    </div>
  );
};
