import { Zoom } from "@material-ui/core";
import { last } from "ramda";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { InfiniteQueryConfig, QueryKey, useInfiniteQuery } from "react-query";
import LoadingBox from "./components/LoadingBox";
import { Paginated } from "./types";

export type FetchMoreRef = (node?: Element | null | undefined) => void;

export const InfiniteScrollBottom = ({
  canFetchMore,
  fetchMoreRef,
}: {
  canFetchMore?: boolean;
  fetchMoreRef: FetchMoreRef;
}) => {
  const [inViewRef, isInView] = useInView();

  return (
    <React.Fragment>
      <Zoom in={isInView && canFetchMore}>
        <LoadingBox p={6} />
      </Zoom>
      <div ref={inViewRef} />
      <div ref={fetchMoreRef} />
    </React.Fragment>
  );
};

export const useInfiniteQueryPagination = <Result,>(
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
      getFetchMore: (lastPage) => {
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
