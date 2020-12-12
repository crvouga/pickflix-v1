import { Box, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDebounce } from "use-debounce/lib";
import ErrorBox from "../common/components/ErrorBox";
import { InfiniteScrollBottom } from "../common/infinite-scroll";
import MoviePosterGrid, {
  MoviePosterGridSkeleton,
} from "../movie/components/MoviePosterGrid";
import { tagsToParams } from "./query/types";
import useDiscoverMovieQuery from "./useDiscoverQuery";
import useDiscoverState from "./useDiscoverState";

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
