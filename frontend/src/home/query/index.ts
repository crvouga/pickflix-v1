import {
  getNowPlayingMovies,
  getPopularMovies,
  getPopularPersons,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../../media/tmdb/query";
import { useInfiniteQueryPagination } from "../../common/infinite-scroll";

export const queryKeys = {
  homePage: () => ["home"],
};

export const getHomePage = async () => {
  const [
    popular,
    personPopular,
    upcoming,
    topRated,
    nowPlaying,
  ] = await Promise.all([
    getPopularMovies(),
    getPopularPersons(),
    getUpcomingMovies(),
    getTopRatedMovies(),
    getNowPlayingMovies(),
  ]);
  return {
    popular,
    personPopular,
    upcoming,
    topRated,
    nowPlaying,
  };
};

export const useQueryPopularMovies = () => {
  return useInfiniteQueryPagination(["popular", "movies"], ({ lastPage }) =>
    getPopularMovies({ page: lastPage })
  );
};

export const useQueryTopRatedMovies = () => {
  return useInfiniteQueryPagination(["top rated", "movies"], ({ lastPage }) =>
    getTopRatedMovies({ page: lastPage })
  );
};

export const useQueryUpcomingMovies = () => {
  return useInfiniteQueryPagination(["upcoming", "movies"], ({ lastPage }) =>
    getUpcomingMovies({ page: lastPage })
  );
};

export const useQueryNowPlayingMovies = () => {
  return useInfiniteQueryPagination(["now playing", "movies"], ({ lastPage }) =>
    getNowPlayingMovies({ page: lastPage })
  );
};
