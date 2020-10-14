import { Box, makeStyles } from "@material-ui/core";
import React, { useRef, useEffect } from "react";
import ErrorBox from "../common/components/ErrorBox";
import LoadingBox from "../common/components/LoadingBox";
import Poster from "../movie/components/MoviePosterCard";
import { useSelector } from "../redux/react-redux";
import { discoverMovie } from "./redux/discover-movie";
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
  const discoverMovieParams = useSelector(
    discoverMovie.selectors.discoverMovieParams
  );

  const { fetchMoreRef, data, error, canFetchMore } = useDiscoverMovieQuery(
    discoverMovieParams
  );

  if (error) {
    return <ErrorBox />;
  }

  if (!data) {
    return <LoadingBox />;
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
