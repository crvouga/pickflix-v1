import { useQuery } from "react-query";
import { useParams } from "react-router";
import { BackendAPI } from "../backend-api";
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
  keywords: MovieKeywords;
  images: MovieImages;
  similar: MovieSimilar;
  recommendations: MovieRecommendations;
  videos: MovieVideos;
  releaseDates: MovieReleaseDates;
} & MovieDetails;

export const fetchMoviePage = async (tmdbMediaId: string) => {
  const { data } = await BackendAPI.get<MoviePageData>(
    `/api/tmdb/movie/${tmdbMediaId}`,
    {
      params: {
        appendToResponse: [
          "credits",
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

export const useQueryMovie = ({ tmdbMediaId }: { tmdbMediaId: string }) => {
  return useQuery(["movie", tmdbMediaId], () => fetchMoviePage(tmdbMediaId));
};

export const useMoviePageQuery = () => {
  const { tmdbMediaId } = useParams<{ tmdbMediaId: string }>();
  return useQueryMovie({ tmdbMediaId: tmdbMediaId });
};
