import { Box, BoxProps } from "@material-ui/core";

import * as R from "remeda";
import React from "react";
import { QueryKey } from "react-query";
import HorizontalSnapScroll from "../../common/components/horizonal-snap-scroll";
import LoadingBox from "../../common/components/LoadingBox";
import NothingHere from "../../common/components/NothingHere";
import { useInfiniteQueryPagination } from "../../common/infinite-scroll";
import { Paginated } from "../../common/types";
import MovieCard, { Movie, MOVIE_POSTER_ASPECT_RATIO } from "./MoviePosterCard";

const WIDTH = 180;
const MAX_WIDTH = undefined;

type MoviePosterScrollProps = {
  movies: Movie[];
  ItemBoxProps?: BoxProps;
};

export const MoviePosterScroll = (props: MoviePosterScrollProps) => {
  const { movies, ItemBoxProps } = props;
  return (
    <Box paddingLeft={2}>
      <HorizontalSnapScroll>
        {movies.map((movie, index) => (
          <Box
            maxWidth={MAX_WIDTH}
            width={WIDTH}
            key={index}
            marginRight={1}
            {...ItemBoxProps}
          >
            <MovieCard movie={movie} />
          </Box>
        ))}
      </HorizontalSnapScroll>
    </Box>
  );
};

export const MoviePosterScrollSkeleton = ({
  posterCount,
}: {
  posterCount: number;
}) => {
  return (
    <MoviePosterScroll
      movies={R.range(0, posterCount).map(() => ({ title: "" }))}
    />
  );
};

export const MoviePosterScrollInfinite = ({
  queryKey,
  queryFn,
  mapPage = (x) => x,
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

  const movies = R.uniqBy(
    query.data.map(mapPage).flatMap((page) => page.results),
    (_) => _.id
  );

  const ratio = MOVIE_POSTER_ASPECT_RATIO[0] / MOVIE_POSTER_ASPECT_RATIO[1];

  const height = WIDTH / ratio;

  return (
    <Box paddingLeft={2}>
      <HorizontalSnapScroll>
        {movies.map((movie, index) => (
          <Box
            maxWidth={MAX_WIDTH}
            width={WIDTH}
            key={[movie.id, index].toString()}
            marginRight={1}
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
    </Box>
  );
};

export default MoviePosterScroll;
