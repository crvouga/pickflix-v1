import axios from "axios";
import { last } from "ramda";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useDebounce } from "use-debounce/lib";
import { getSearchMulti, queryKeys } from "./query";

export default (searchQuery: string) => {
  const [debounced] = useDebounce(encodeURI(searchQuery.trim()), 500);

  const query = useInfiniteQuery(
    queryKeys.searchMulti(debounced),
    (...args) => {
      const page = (last(args) || 1) as number;
      const source = axios.CancelToken.source();
      const promise = getSearchMulti({ page, query: debounced });
      //@ts-ignore
      promise.cancel = () => {
        source.cancel("Query was cancelled by React Query");
      };
      return promise;
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
    fetchMoreRef,
  };
};
