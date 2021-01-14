import { Box, BoxProps } from "@material-ui/core";
import { identity, repeat, uniqBy } from "ramda";
import React from "react";
import { QueryKey } from "react-query";
import HorizontalSnapScroll from "../../common/components/HorizontalSnapScroll";
import LoadingBox from "../../common/components/LoadingBox";
import NothingHere from "../../common/components/NothingHere";
import { useInfiniteQueryPagination } from "../../common/infinite-scroll";
import { Paginated } from "../../common/types";
import MovieCard, { Movie, MOVIE_POSTER_ASPECT_RATIO } from "./MoviePosterCard";

const WIDTH = 200;

type MoviePosterScrollProps = {
  movies: Movie[];
  ItemBoxProps?: BoxProps;
};

export const MoviePosterScroll = (props: MoviePosterScrollProps) => {
  const { movies, ItemBoxProps } = props;
  return (
    <HorizontalSnapScroll>
      {movies.map((movie) => (
        <Box
          width={WIDTH}
          key={movie.id}
          marginLeft={1 + 1 / 2}
          {...ItemBoxProps}
        >
          <MovieCard movie={movie} />
        </Box>
      ))}
    </HorizontalSnapScroll>
  );
};

export const MoviePosterScrollSkeleton = ({
  posterCount,
}: {
  posterCount: number;
}) => {
  return <MoviePosterScroll movies={repeat({ title: "" }, posterCount)} />;
};

export const MoviePosterScrollInfinite = ({
  queryKey,
  queryFn,
  mapPage = identity,
}: {
  queryKey: QueryKey;
  queryFn: ({ page }: { page: number }) => Promise<Paginated<Movie>>;
  mapPage?: (page: Paginated<Movie>) => Paginated<Movie>;
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
    return <MoviePosterScrollSkeleton posterCount={12} />;
  }

  if (query.data[0] && query.data[0].results.length === 0) {
    return <NothingHere />;
  }

  const movies = uniqBy(
    (_) => _.id,
    query.data.map(mapPage).flatMap((page) => page.results)
  );

  const ratio = MOVIE_POSTER_ASPECT_RATIO[0] / MOVIE_POSTER_ASPECT_RATIO[1];
  const height = WIDTH / ratio;
  return (
    <HorizontalSnapScroll>
      {movies.map((movie, index) => (
        <Box
          width={WIDTH}
          key={[movie.id, index].toString()}
          marginLeft={1 + 1 / 2}
        >
          <MovieCard movie={movie} />
        </Box>
      ))}
      <div ref={query.fetchMoreRef} />
      {query.canFetchMore && (
        <Box
          width={WIDTH}
          height={height}
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <LoadingBox />
        </Box>
      )}
    </HorizontalSnapScroll>
  );
};

export default MoviePosterScroll;
