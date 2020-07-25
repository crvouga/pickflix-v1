import { Box, Grow, Typography, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import MoviePoster from "../movie/components/Poster";
import PersonAvatar from "../person/PersonAvatar";
import search from "./redux";
import ResultGrid from "./ResultGrid";

export default () => {
  const dispatch = useDispatch();
  const results = useSelector(search.selectors.results);
  const status = useSelector(search.selectors.status);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      dispatch(search.actions.fetch());
    }
  }, [inView]);

  const handleResultClick = (result) => {
    dispatch(search.actions.chose(result));
  };

  return (
    <div>
      <ResultGrid results={results} onResultClick={handleResultClick} />
      <Box textAlign="center" width="100%" p={2}>
        {status === "loading" && <CircularProgress />}
      </Box>
      <div ref={ref} />
    </div>
  );
};
