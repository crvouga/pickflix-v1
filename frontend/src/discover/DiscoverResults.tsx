import { Box } from "@material-ui/core";
import React from "react";
import ErrorBox from "../common/components/ErrorBox";
import LoadingBox from "../common/components/LoadingBox";
import Poster from "../movie/components/MoviePosterCard";
import useDiscoverMovieQuery from "./useDiscoverMovieQuery";

export default () => {
  const discoverMovieParams = {};
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
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {data.map((response) =>
          response.results.map((result) => (
            <Box p={1 / 2} width="50%" key={result.id}>
              <Poster movie={result} />
            </Box>
          ))
        )}
        <div ref={fetchMoreRef} />
      </Box>
      {canFetchMore && <LoadingBox m={4} />}
    </React.Fragment>
  );
};
