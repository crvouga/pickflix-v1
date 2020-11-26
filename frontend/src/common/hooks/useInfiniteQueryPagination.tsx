import throttle from "lodash.throttle";
import { last } from "ramda";
import { useCallback, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { InfiniteQueryConfig, QueryKey, useInfiniteQuery } from "react-query";
import { Paginated } from "../types";
import { useDebounce } from "use-debounce/lib";

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
    const { canFetchMore, isFetching } = query;
    if (inView && canFetchMore && !isFetching) {
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
