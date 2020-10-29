import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useDebounce } from "use-debounce/lib";
import ErrorBox from "../common/components/ErrorBox";
import LoadingBox from "../common/components/LoadingBox";
import Poster from "../movie/components/MoviePosterCard";
import MoviePosterCardSkeleton from "../movie/components/MoviePosterCardSkeleton";
import { tagsToParams } from "./query/types";
import useDiscoverLogic from "./useDiscoverLogic";
import useDiscoverMovieQuery from "./useDiscoverQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

export default () => {
  const classes = useStyles();
  const { activeTags } = useDiscoverLogic();
  const [discoverQueryParams] = useDebounce(tagsToParams(activeTags), 100);
  const { fetchMoreRef, data, error, canFetchMore } = useDiscoverMovieQuery(
    discoverQueryParams
  );

  if (error) {
    return <ErrorBox />;
  }

  if (!data) {
    return (
      <React.Fragment>
        <div className={classes.root}>
          {[1, 2, 3, 4].map((n) => (
            <Box p={1 / 2} width="50%" key={n}>
              <MoviePosterCardSkeleton />
            </Box>
          ))}
        </div>
      </React.Fragment>
    );
  }

  if (data[0] && data[0].results.length === 0) {
    return (
      <Box p={4}>
        <Typography variant="h6" align="center" color="textSecondary">
          Couldn't find anything
        </Typography>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        {data.map((response) =>
          response.results.map((result) => (
            <Box p={1 / 2} width="50%" maxWidth="150px" key={result.id}>
              <Poster sizeIndex={2} movie={result} />
            </Box>
          ))
        )}
      </div>
      <div ref={fetchMoreRef} />
      {canFetchMore && <LoadingBox m={4} />}
    </React.Fragment>
  );
};
