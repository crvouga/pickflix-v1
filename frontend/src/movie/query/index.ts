import { useQuery } from "react-query";
import { BackendAPI } from "../../backend-api";
import {
  MovieCredits,
  MovieDetails,
  MovieImages,
  MovieKeywords,
  MovieRecommendations,
  MovieReleaseDates,
  MovieSimilar,
  MovieVideos,
  MediaId,
} from "../../media/tmdb/types";

export type MoviePageData = {
  credits: MovieCredits;
  keywords?: MovieKeywords;
  images: MovieImages;
  // similar: MovieSimilar;
  // recommendations: MovieRecommendations;
  videos?: MovieVideos;
  releaseDates?: MovieReleaseDates;
} & MovieDetails;

export const getMoviePage = async (tmdbMediaId: number) => {
  const { data } = await BackendAPI.get<MoviePageData>(
    `/api/tmdb/movie/${tmdbMediaId}`,
    {
      params: {
        appendToResponse: [
          "credits",
          // "similar",
          // "recommendations",
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

export const queryKeys = {
  movie: ({ tmdbMediaId }: { tmdbMediaId: string }) => ["movie", tmdbMediaId],
  similar: ({ tmdbMediaId }: { tmdbMediaId: string }) => [
    "movie",
    "similar",
    tmdbMediaId,
  ],
  recommendations: ({ tmdbMediaId }: { tmdbMediaId: string }) => [
    "movie",
    "recommendations",
    tmdbMediaId,
  ],
};

export const useQueryMoviePage = ({ mediaId }: { mediaId: MediaId }) => {
  return useQuery(["movie", mediaId.tmdbMediaId], () =>
    getMoviePage(mediaId.tmdbMediaId)
  );
};

export const getMovieSimilar = async ({
  tmdbMediaId,
  page,
}: {
  tmdbMediaId: string;
  page: number;
}) => {
  const { data } = await BackendAPI.get<MovieSimilar>(
    `/api/tmdb/movie/${tmdbMediaId}/similar`,
    {
      params: {
        page,
      },
    }
  );

  return data;
};

export const getMovieRecommendations = async ({
  tmdbMediaId,
  page,
}: {
  tmdbMediaId: string;
  page: number;
}) => {
  const { data } = await BackendAPI.get<MovieRecommendations>(
    `/api/tmdb/movie/${tmdbMediaId}/recommendations`,
    {
      params: {
        page,
      },
    }
  );

  return data;
};
