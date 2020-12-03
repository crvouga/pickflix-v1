import { uniqBy } from "ramda";
import React from "react";
import { QueryKey } from "react-query";
import { useInfiniteQueryPagination } from "../../common/infinite-scroll";
import { Paginated } from "../../common/types";
import MoviePosterGrid, {
  MoviePosterGridSkeleton,
} from "../components/MoviePosterGrid";
import { Movie } from "./MoviePosterCard";
import { InfiniteScrollBottom } from "../../common/infinite-scroll";

export default ({
  queryKey,
  queryFn,
}: {
  queryKey: QueryKey;
  queryFn: ({ page }: { page: number }) => Promise<Paginated<Movie>>;
}) => {
  const query = useInfiniteQueryPagination(
    queryKey,
    ({ lastPage }) => queryFn({ page: lastPage }),
    {}
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <MoviePosterGridSkeleton posterCount={12} />;
  }

  if (query.data[0] && query.data[0].results.length === 0) {
    return null;
  }

  const movies = uniqBy(
    (_) => _.id,
    query.data.flatMap((_) => _.results)
  );

  return (
    <React.Fragment>
      <MoviePosterGrid movies={movies} />
      <InfiniteScrollBottom {...query} />
    </React.Fragment>
  );
};
