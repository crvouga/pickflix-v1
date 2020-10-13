// SOURCE: https://developers.themoviedb.org/3/discover/movie-discover

export type DiscoverMovieSortBy =
  | "popularity.asc"
  | "popularity.desc"
  | "release_date.asc"
  | "release_date.desc"
  | "revenue.asc"
  | "revenue.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc"
  | "original_title.asc"
  | "original_title.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc";

export const sortByValueToName: { [key in DiscoverMovieSortBy]: string } = {
  "popularity.asc": "Least Popular",
  "popularity.desc": "Most Popular",
  "release_date.asc": "Oldest",
  "release_date.desc": "Newest",
  "revenue.asc": "Revenue (low to high)",
  "revenue.desc": "Revenue (high to low)",
  "primary_release_date.asc": "Oldest",
  "primary_release_date.desc": "Newest",
  "original_title.asc": "A to Z",
  "original_title.desc": "Z to A",
  "vote_average.asc": "Vote Average (low to high)",
  "vote_average.desc": "Vote Average (high to low)",
  "vote_count.asc": "Vote Count (low to high)",
  "vote_count.desc": "Vote Count (high to low)",
};

export enum DiscoverMovieSortByEnum {
  "popularity.asc" = "Least Popular",
  "popularity.desc" = "Most Popular",
  "release_date.asc" = "Oldest",
  "release_date.desc" = "Newest",
  "revenue.asc" = "Revenue (low to high)",
  "revenue.desc" = "Revenue (high to low)",
  "primary_release_date.asc" = "Oldest",
  "primary_release_date.desc" = "Newest",
  "original_title.asc" = "A to Z",
  "original_title.desc" = "Z to A",
  "vote_average.asc" = "Vote Average (low to high)",
  "vote_average.desc" = "Vote Average (high to low)",
  "vote_count.asc" = "Vote Count (low to high)",
  "vote_count.desc" = "Vote Count (high to low)",
}

export type DiscoverMovieParams = {
  language?: string;
  region?: string;
  sortBy?: DiscoverMovieSortBy;
  certificationCountry?: string;
  certification?: string;
  "certification.lte"?: string;
  "certification.gte"?: string;
  includeAdult?: boolean;
  includeVideo?: boolean;
  page?: number;
  primaryReleaseYear?: number;
  "primaryReleaseDate.gte"?: string;
  "primaryReleaseDate.lte"?: string;
  "releaseDate.gte"?: string;
  "releaseDate.lte"?: string;
  withReleaseType?: number;
  year?: number;
  "voteCount.gte"?: number;
  "voteCount.lte"?: number;
  "voteAverage.gte"?: number;
  "voteAverage.lte"?: number;
  withCast?: string[];
  withCrew?: string[];
  withPeople?: string[];
  withCompanies?: string[];
  withGenres?: string[];
  withoutGenres?: string[];
  withKeywords?: string[];
  withoutKeywords?: string[];
  "withRuntime.gte"?: number;
  "withRuntime.lte"?: number;
  withOriginalLanguage?: string;
};

export type DiscoverMovieParamTag = {
  id: string;
  key: keyof DiscoverMovieParams;
  data: any;
};

export type MovieListResult = {
  posterPath: string | null;
  adult: boolean;
  overview: string;
  releaseDate: string;
  genreIds: string[];
  id: string;
  originalTitle: string;
  originalLanguage: string;
  title: string;
  backdropPath: string | null;
  popularity: number;
  voteCount: number;
  video: boolean;
  voteAverage: number;
};

export type DiscoverMovieResponse = {
  page: number;
  totalResults: number;
  totalPages: number;
  results: MovieListResult[];
};
