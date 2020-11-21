import {
  getNowPlayingMovies,
  getPopularMovies,
  getPopularPersons,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../../media/tmdb/query";

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
