import * as TMDB from "../api/tmdb";

export const fetchMoviePage = (movieId) => {
  return TMDB.movie.details(movieId, {
    appendToResponse: [
      "credits",
      "reviews",
      "similar",
      "recommendations",
      "keywords",
      "videos",
      "images",
    ],
  });
};
