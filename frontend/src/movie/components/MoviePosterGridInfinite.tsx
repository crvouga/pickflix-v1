import { uniqBy } from "ramda";
import React from "react";
import { QueryKey } from "react-query";
import LoadingBox from "../../common/components/LoadingBox";
import useInfiniteQueryPagination from "../../common/hooks/useInfiniteQueryPagination";
import { Paginated } from "../../common/types";
import MoviePosterGrid, {
  MoviePosterGridSkeleton,
} from "../components/MoviePosterGrid";
import { Movie } from "./MoviePosterCard";

export default ({
  queryKey,
  queryFn,
}: {
  queryKey: QueryKey;
  queryFn: ({ page }: { page: number }) => Promise<Paginated<Movie>>;
}) => {
  const {
    fetchMoreRef,
    data,
    error,
    canFetchMore,
  } = useInfiniteQueryPagination(
    queryKey,
    ({ lastPage }) => queryFn({ page: lastPage }),
    {}
  );

  if (error) {
    return null;
  }

  if (!data) {
    return <MoviePosterGridSkeleton posterCount={12} />;
  }

  if (data[0] && data[0].results.length === 0) {
    return null;
  }

  const movies = uniqBy(
    (_) => _.id,
    data.flatMap((_) => _.results)
  );

  return (
    <React.Fragment>
      <MoviePosterGrid movies={movies} />
      <div ref={fetchMoreRef} />
      {canFetchMore && <LoadingBox m={6} />}
    </React.Fragment>
  );
};
