import { Box, BoxProps } from "@material-ui/core";
import { repeat, uniqBy } from "ramda";
import React from "react";
import { QueryKey } from "react-query";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import NothingHere from "../../common/components/NothingHere";
import { useInfiniteQueryPagination } from "../../common/infinite-scroll";
import { Paginated } from "../../common/types";
import MovieCard, { Movie, MOVIE_POSTER_ASPECT_RATIO } from "./MoviePosterCard";
import LoadingBox from "../../common/components/LoadingBox";

const WIDTH = 180;

type MoviePosterScrollProps = {
  movies: Movie[];
  ItemBoxProps?: BoxProps;
};

export const MoviePosterScroll = (props: MoviePosterScrollProps) => {
  const { movies, ItemBoxProps } = props;
  return (
    <HorizontalScroll paddingLeft={2} width="100%">
      {movies.map((movie) => (
        <Box width={WIDTH} key={movie.id} marginRight={1} {...ItemBoxProps}>
          <MovieCard movie={movie} />
        </Box>
      ))}
    </HorizontalScroll>
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
    return <MoviePosterScrollSkeleton posterCount={12} />;
  }

  if (query.data[0] && query.data[0].results.length === 0) {
    return <NothingHere />;
  }

  const movies = uniqBy(
    (_) => _.id,
    query.data.flatMap((_) => _.results)
  );

  const ratio = MOVIE_POSTER_ASPECT_RATIO[0] / MOVIE_POSTER_ASPECT_RATIO[1];
  const height = WIDTH / ratio;
  return (
    <HorizontalScroll paddingLeft={2} width="100%">
      {movies.map((movie, index) => (
        <Box width="180px" key={[movie.id, index].toString()} marginRight={1}>
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
    </HorizontalScroll>
  );
};

export default MoviePosterScroll;
