import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useDebounce } from "use-debounce/lib";
import ErrorBox from "../common/components/ErrorBox";
import LoadingBox from "../common/components/LoadingBox";
import MoviePosterGrid, {
  MoviePosterGridSkeleton,
} from "../movie/components/MoviePosterGrid";
import { tagsToParams } from "./query/types";
import useDiscoverState from "./useDiscoverState";
import useDiscoverMovieQuery from "./useDiscoverQuery";
import InfiniteScrollBottom from "../common/components/InfiniteScrollBottom";

export default () => {
  const { activeTags } = useDiscoverState();
  const [discoverQueryParams] = useDebounce(tagsToParams(activeTags), 100);
  const { fetchMoreRef, data, error, canFetchMore } = useDiscoverMovieQuery(
    discoverQueryParams
  );

  if (error) {
    return <ErrorBox />;
  }

  if (!data) {
    return <MoviePosterGridSkeleton posterCount={12} />;
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
      <MoviePosterGrid movies={data.flatMap((response) => response.results)} />
      <InfiniteScrollBottom
        canFetchMore={canFetchMore}
        fetchMoreRef={fetchMoreRef}
      />
    </React.Fragment>
  );
};
