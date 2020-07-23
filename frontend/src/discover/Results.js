import { Box, CircularProgress, Typography } from "@material-ui/core";
import numeral from "numeral";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import Poster from "../movie/components/Poster";
import discover from "./redux/discover";

export default () => {
  const [ref, inView, entry] = useInView();
  const results = useSelector(discover.selectors.results);
  const totalResults = useSelector(discover.selectors.totalResults);
  const status = useSelector(discover.selectors.status);
  const dispatch = useDispatch();
  useEffect(() => {
    if (inView) {
      dispatch(discover.actions.load());
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
          <Box key={result.id} p={1} width="50%">
            <Poster key={result.id} movie={result} sizeIndex={Infinity} />
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
