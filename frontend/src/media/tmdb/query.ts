import { useQuery } from "react-query";
import { BackendAPI } from "../../backend-api";
import { useInfiniteQueryPagination } from "../../common/infinite-scroll";
import { Paginated } from "../../common/types";
import {
  MediaId,
  Movie,
  MovieDetails,
  MovieReview,
  Person,
  PersonDetailsResponse,
  TmdbConfiguration,
} from "./types";

export const queryKeys = {
  tmdbConfiguration: () => ["tmdb", "configuration"],
  video: (tmdbMediaId: string) => ["video", tmdbMediaId],
  movieReviews: ({ mediaId }: { mediaId: MediaId }) => [
    "movie",
    mediaId,
    "reviews",
  ],
  searchMovies: ({ query }: { query: string }) => ["search", "movie", query],
};

export const getTmdbMovieReviews = async ({
  mediaId,
  page,
}: {
  mediaId: MediaId;
  page?: number;
}) => {
  const { data } = await BackendAPI.get<Paginated<MovieReview>>(
    `/api/tmdb/movie/${mediaId.tmdbMediaId}/reviews`,
    {
      params: {
        page,
      },
    }
  );
  return data;
};

export const getTmdbConfiguration = async () => {
  const { data } = await BackendAPI.get<TmdbConfiguration>(
    "/api/tmdb/configuration"
  );
  return data;
};

export const getPopularMovies = async ({ page }: { page?: number } = {}) => {
  const { data } = await BackendAPI.get<Paginated<Movie>>(
    "/api/tmdb/movie/popular",
    {
      params: {
        page,
      },
    }
  );
  return data;
};

export const getPopularPersons = async ({ page }: { page?: number } = {}) => {
  const { data } = await BackendAPI.get<Paginated<Person>>(
    "/api/tmdb/person/popular",
    {
      params: {
        page,
      },
    }
  );
  return data;
};

export const getUpcomingMovies = async ({ page }: { page?: number } = {}) => {
  const { data } = await BackendAPI.get<Paginated<Movie>>(
    "/api/tmdb/movie/upcoming",
    {
      params: {
        page,
      },
    }
  );
  return data;
};

export const getTopRatedMovies = async ({ page }: { page?: number } = {}) => {
  const { data } = await BackendAPI.get<Paginated<Movie>>(
    "/api/tmdb/discover/movie",
    {
      params: {
        page,
        "vote_count.gte": 8000,
        "vote_average.gte": 8.0,
      },
    }
  );
  return data;
};

export const getNowPlayingMovies = async ({ page }: { page?: number } = {}) => {
  const { data } = await BackendAPI.get<Paginated<Movie>>(
    "/api/tmdb/movie/nowPlaying",
    {
      params: {
        page,
      },
    }
  );
  return data;
};

export const getMoviesSimilar = async ({
  mediaId,
  page,
}: {
  mediaId: MediaId;
  page?: number;
}) => {
  const { data } = await BackendAPI.get<Paginated<Movie>>(
    `/api/tmdb/movie/${mediaId.tmdbMediaId}/similar`,
    {
      params: {
        page,
      },
    }
  );
  return data;
};

export const getMoviesRecommendations = async ({
  mediaId,
  page,
}: {
  mediaId: MediaId;
  page?: number;
}) => {
  const { data } = await BackendAPI.get<Paginated<Movie>>(
    `/api/tmdb/movie/${mediaId.tmdbMediaId}/recommendations`,
    {
      params: {
        page,
      },
    }
  );
  return data;
};
export const getSearchMovies = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  if (query.length === 0) {
    return {
      page: 1,
      totalResults: 0,
      results: [],
    };
  }
  const { data } = await BackendAPI.get<Paginated<Movie>>(
    "/api/tmdb/search/movie",
    {
      params: {
        query,
        page,
      },
    }
  );
  return data;
};

export const getMovie = async ({ mediaId }: { mediaId: MediaId }) => {
  const { data } = await BackendAPI.get<MovieDetails>(
    `/api/tmdb/movie/${mediaId.tmdbMediaId}`
  );

  return data;
};

export const useQueryMovie = ({ mediaId }: { mediaId: MediaId }) => {
  return useQuery([mediaId], () => getMovie({ mediaId }), {});
};

export const getPerson = async ({ mediaId }: { mediaId: MediaId }) => {
  const { data } = await BackendAPI.get<PersonDetailsResponse>(
    `/api/tmdb/person/${mediaId.tmdbMediaId}`
  );
  return data;
};

export const getTv = async ({ mediaId }: { mediaId: MediaId }) => {
  const { data } = await BackendAPI.get<unknown>(
    `/api/tmdb/tv/${mediaId.tmdbMediaId}`
  );
  return data;
};

export const getMedia = ({ mediaId }: { mediaId: MediaId }) => {
  switch (mediaId.tmdbMediaType) {
    case "movie":
      return getMovie({ mediaId });
    case "person":
      return getPerson({ mediaId });
  }
};

export const useQueryMovieSearch = ({
  text,
  page = 1,
}: {
  text: string;
  page?: number;
}) => {
  return useQuery(["movie", "search", text, page], () =>
    getSearchMovies({ query: text, page })
  );
};

const makeGetTmdbReviewsQueryKey = ({ mediaId }: { mediaId: MediaId }) => [
  "movie",
  mediaId,
  "reviews",
];

export const useQueryTmdbReviews = ({ mediaId }: { mediaId: MediaId }) => {
  return useInfiniteQueryPagination(
    makeGetTmdbReviewsQueryKey({ mediaId }),
    ({ lastPage }) => getTmdbMovieReviews({ mediaId, page: lastPage })
  );
};
