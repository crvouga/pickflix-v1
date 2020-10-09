import { useQuery } from "react-query";
import { useParams } from "react-router";
import backendAPI from "../backendAPI";
import {
  MovieCredits,
  MovieDetails,
  MovieImages,
  MovieKeywords,
  MovieRecommendations,
  MovieReleaseDates,
  MovieReviews,
  MovieSimilar,
  MovieVideos,
} from "../tmdb/types";

export type MoviePageData = {
  credits: MovieCredits;
  reviews: MovieReviews;
  keywords: MovieKeywords;
  images: MovieImages;
  similar: MovieSimilar;
  recommendations: MovieRecommendations;
  videos: MovieVideos;
  releaseDates: MovieReleaseDates;
} & MovieDetails;

export const fetchMoviePage = async (movieId: string) => {
  const { data } = await backendAPI.get<MoviePageData>(
    `/api/tmdb/movie/${movieId}`,
    {
      params: {
        appendToResponse: [
          "credits",
          "reviews",
          "similar",
          "recommendations",
          "keywords",
          "videos",
          "images",
          "release_dates",
        ],
      },
    }
  );

  return data;
};

export const useMoviePageQuery = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const query = useQuery(`/movie/${movieId}`, () => fetchMoviePage(movieId));

  return query;
};
