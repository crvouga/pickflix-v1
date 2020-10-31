import { BackendAPI } from "../backend-api";
import { MovieReviews } from "./types";

export const queryKeys = {
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
