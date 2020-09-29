import { Box, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import Poster from "../movie/components/Poster";
import { Movie } from "../tmdb/types";
import discover from "./redux";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
  },
}));

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
  }, [inView, canRequestMoreDiscover, dispatch]);
  return ref;
};

export default () => {
  const classes = useStyles();
  const triggerRef = useInifiniteScrollRef();

  const activeTags = useSelector(discover.selectors.activeTags);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeTags]);

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
    <div ref={scrollRef} className={classes.container}>
      {results.map((result) => (
        <Box p={1 / 2} width="50%" key={result.id}>
          <Poster movie={result as Movie} width="100%" />
        </Box>
      ))}
      <div ref={triggerRef} />
    </div>
  );
};
