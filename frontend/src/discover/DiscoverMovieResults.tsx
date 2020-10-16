import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import ErrorBox from "../common/components/ErrorBox";
import LoadingBox from "../common/components/LoadingBox";
import Poster from "../movie/components/MoviePosterCard";
import MoviePosterCardSkeleton from "../movie/components/MoviePosterCardSkeleton";
import { discoverParams } from "./redux/discover-params";
import useDiscoverMovieQuery from "./useDiscoverMovieQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

export default () => {
  const classes = useStyles();
  const discoverQueryParams = useSelector(
    discoverParams.selectors.discoverQueryParams
  );

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

  return (
    <React.Fragment>
      <div className={classes.root}>
        {data.map((response) =>
          response.results.map((result) => (
            <Box p={1 / 2} width="50%" key={result.id}>
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
