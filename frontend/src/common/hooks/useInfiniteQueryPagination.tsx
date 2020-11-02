import { last } from "ramda";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  useInfiniteQuery,
  QueryKey,
  QueryFunction,
  InfiniteQueryConfig,
} from "react-query";

type Paginated<Result> = {
  page: number;
  totalPages: number;
  results: Result[];
};

export default <Result,>(
  queryKey: QueryKey,
  queryFn: QueryFunction<Paginated<Result>>,
  queryConfig?: InfiniteQueryConfig<Paginated<Result>>
) => {
  const query = useInfiniteQuery(
    queryKey,
    (...args) => {
      const lastPage = (last(args) || 1) as number;
      return queryFn({ lastPage });
    },
    {
      getFetchMore: (lastPage, allPages) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
      },
      ...queryConfig,
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
  }, [query, inView]);

  return {
    ...query,
    queryKey,
    fetchMoreRef,
  };
};
