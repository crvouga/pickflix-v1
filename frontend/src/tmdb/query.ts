import { BackendAPI } from "../backend-api";
import { MovieReviews, TmdbConfiguration } from "./types";

export const queryKeys = {
  tmdbConfiguration: () => ["tmdb", "configuration"],
  video: (tmdbMediaId: string) => ["video", tmdbMediaId],
  movieReviews: (tmdbMediaId: string) => ["movie", tmdbMediaId, "reviews"],
};

export const getTmdbMovieReviews = async ({
  tmdbMediaId,
}: {
  tmdbMediaId: string;
}) => {
  const { data } = await BackendAPI.get<MovieReviews>(
    `/api/tmdb/movie/${tmdbMediaId}/reviews`
  );
  return data;
};

export const getTmdbConfiguration = async () => {
  const { data } = await BackendAPI.get<TmdbConfiguration>(
    "/api/tmdb/configuration"
  );
  return data;
};
