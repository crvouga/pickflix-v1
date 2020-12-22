import { Box, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import NothingHere from "../common/components/NothingHere";
import MoviePosterGrid from "../movie/components/MoviePosterGrid";
import usePageHistory from "./page-history/usePageHistory";
export const TabPanelPageHistory = () => {
  const pageHistory = usePageHistory();

  const PAGE_SIZE = 12;
  const [page, setPage] = useState(1);

  const movies = pageHistory.entities.slice(0, PAGE_SIZE * page);
  const [inViewRef, isInView] = useInView();

  useEffect(() => {
    if (isInView) {
      setPage((page) => page + 1);
    }
  }, [isInView]);

  if (movies.length === 0) {
    return <NothingHere />;
  }

  return (
    <React.Fragment>
      <ListItem>
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary="Recently Viewed"
        />
      </ListItem>
      <MoviePosterGrid movies={movies} />
      <Box p={4}>
        <div ref={inViewRef} />
      </Box>
    </React.Fragment>
  );
};
