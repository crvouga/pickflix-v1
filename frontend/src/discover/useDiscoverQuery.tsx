import useInfiniteQueryPagination from "../common/hooks/useInfiniteQueryPagination";
import { getDiscoverMovie, queryKeys } from "./query";
import { DiscoverMovieQueryParams } from "./query/types";

export default (discoverMovieParams: DiscoverMovieQueryParams) => {
  return useInfiniteQueryPagination(
    queryKeys.discoverMovie(discoverMovieParams),
    ({ lastPage }) => {
      return getDiscoverMovie({ ...discoverMovieParams, page: lastPage });
    },
    {}
  );
};
