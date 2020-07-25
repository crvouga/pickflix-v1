import { Box, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import search from "./redux";
import ResultGrid from "./ResultGrid";

export default () => {
  const dispatch = useDispatch();
  const results = useSelector(search.selectors.results);
  const status = useSelector(search.selectors.status);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      console.log("FETCH");
      dispatch(search.actions.fetch());
    }
  }, [inView]);

  const handleResultClick = (result) => {
    dispatch(search.actions.chose(result));
  };

  return (
    <div>
      <ResultGrid results={results} onResultClick={handleResultClick} />
      {status === "loading" && (
        <Box p={2} textAlign="center">
          <CircularProgress />
        </Box>
      )}
      <div ref={ref} />
    </div>
  );
};
