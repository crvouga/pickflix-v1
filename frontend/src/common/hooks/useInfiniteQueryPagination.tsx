import { last } from "ramda";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { InfiniteQueryConfig, QueryKey, useInfiniteQuery } from "react-query";
import { Paginated } from "../types";

export default <Result,>(
  queryKey: QueryKey,
  queryFn: ({ lastPage }: { lastPage: number }) => Promise<Paginated<Result>>,
  queryConfig?: InfiniteQueryConfig<Paginated<Result>>
) => {
  const query = useInfiniteQuery(
    queryKey,
    (...args) => {
      const lastPage = Number(last(args) ?? 1);
      return queryFn({ lastPage });
    },
    {
      getFetchMore: (lastPage, allPages) => {
        if (
          lastPage.page < lastPage.totalPages ||
          lastPage.results.length > 0
        ) {
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
  }, [
    query.isFetching,
    query.canFetchMore,
    query.isFetchingMore,
    query.fetchMore,
    inView,
  ]);

  return {
    ...query,
    queryKey,
    fetchMoreRef,
  };
};
