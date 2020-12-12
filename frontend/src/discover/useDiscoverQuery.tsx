import { InfiniteQueryConfig } from "react-query";
import { useInfiniteQueryPagination } from "../common/infinite-scroll";
import { Paginated } from "../common/types";
import { getDiscoverMovie, queryKeys } from "./query";
import { DiscoverMovieQueryParams, MovieListResult } from "./query/types";

export default (
  discoverMovieParams: DiscoverMovieQueryParams,
  config?: InfiniteQueryConfig<Paginated<MovieListResult>>
) => {
  return useInfiniteQueryPagination(
    queryKeys.discoverMovie(discoverMovieParams),
    ({ lastPage }) => {
      return getDiscoverMovie({ ...discoverMovieParams, page: lastPage });
    },
    config
  );
};
