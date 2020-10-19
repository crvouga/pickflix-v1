import { last } from "ramda";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { getDiscoverMovie, queryKeys } from "./query";
import { DiscoverMovieQueryParams } from "./query/types";

export default (discoverMovieParams: DiscoverMovieQueryParams) => {
  const queryKey = queryKeys.discoverMovie(discoverMovieParams);

  const query = useInfiniteQuery(
    queryKey,
    (...args) => {
      const page = (last(args) || 1) as number;
      return getDiscoverMovie({ ...discoverMovieParams, page });
    },
    {
      getFetchMore: (lastPage, allPages) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
      },
    }
  );

  const [fetchMoreRef, inView] = useInView();

  useEffect(() => {
    if (
      inView &&
      query.canFetchMore &&
      !query.isFetching &&
      !query.isFetchingMore
    ) {
      query.fetchMore();
    }
    return () => {};
  }, [inView]);

  return {
    ...query,
    queryKey,
    fetchMoreRef,
  };
};
