import { Box, Grow, Typography, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import MoviePoster from "../movie/components/Poster";
import PersonAvatar from "../person/PersonAvatar";
import search from "./redux";

export default () => {
  const dispatch = useDispatch();
  const results = useSelector(search.selectors.results);
  const status = useSelector(search.selectors.status);
  const [ref, inView, entry] = useInView();

  useEffect(() => {
    if (inView) {
      dispatch(search.actions.fetch());
    }
  }, [inView]);

  const handleResultClick = (result) => () => {
    dispatch(search.actions.chose(result));
  };

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      {results.map((result) => (
        <Box key={result.id} onClick={handleResultClick(result)} width="33.33%">
          <Grow in>
            {result.mediaType === "movie" ? (
              <MoviePoster movie={result} />
            ) : result.mediaType === "person" ? (
              <Box marginBottom="auto" p={1}>
                <PersonAvatar person={result} marginBottom={1} />
                <Typography>{result.name}</Typography>
              </Box>
            ) : (
              <div />
            )}
          </Grow>
        </Box>
      ))}
      <Box textAlign="center" width="100%" p={2}>
        {status === "loading" && <CircularProgress />}
      </Box>
      <div ref={ref} />
    </Box>
  );
};
