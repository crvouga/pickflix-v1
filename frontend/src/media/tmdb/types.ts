import { Paginated } from "../../common/types";

export enum TmdbMediaType {
  movie = "movie",
  person = "person",
}

export type MediaId = {
  tmdbMediaId: number;
  tmdbMediaType: TmdbMediaType;
};

export type TmdbMedia = {
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
  tmdbData?: any;
};

export type SizesKey =
  | "profileSizes"
  | "posterSizes"
  | "backdropSizes"
  | "stillSizes"
  | "logoSizes";

export type PathKey =
  | "profilePath"
  | "posterPath"
  | "logoPath"
  | "backdropPath"
  | "stillPath";

export const pathKeyToSizesKey = {
  backdropPath: "backdropSizes",
  logoPath: "logoSizes",
  posterPath: "posterSizes",
  profilePath: "profileSizes",
  stillPath: "stillSizes",
};

export type ImagePaths = {
  [key in PathKey]?: null | string;
};

export type TmdbConfiguration = {
  images: {
    secureBaseUrl: string;
  } & {
    [key in SizesKey]: string[];
  };
};

export interface Movie {
  mediaType?: "movie";
  id: string;
  posterPath: string;
  title: string;
  backdropPath?: string;
  releaseDate?: string;
  overview?: string;
}

export interface Person {
  mediaType?: "person";
  id: string;
  profilePath: string;
  name: string;
}

export interface MovieReview {
  id: string;
  url: string;
  content: string;
  author: string;
}

export interface MovieGenre {
  id: string;
  name: string;
}

export interface ProductionCompany {
  name: string;
  id: string;
  logoPath: string | null;
  originCountry: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export type MovieStatus =
  | "Rumored"
  | "Planned"
  | "In Production"
  | "Post Production"
  | "Released"
  | "Canceled";

//https://developers.themoviedb.org/3/movies/get-movie-details
export interface MovieDetails {
  adult: boolean;
  backdropPath: string | null;
  belongsToCollection: ({ [key: string]: any } & { id: string }) | null;
  budget: number;
  genres: MovieGenre[];
  homepage: string | null;
  id: string;
  imdbId: string | null;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: ProductionCompany[];
  logoPath: string;
  originCountry: string;
  productionCountries: ProductionCountry[];
  releaseDate: string;
  revenue: number;
  runtime: number | null;
  spokenLanguages: SpokenLanguage[];
  status: MovieStatus;

  tagline: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

/* https://developers.themoviedb.org/3/collections/get-collection-details */
export interface CollectionPart {
  adult: boolean;
  backdropPath: string;
  genreIds: string[];
  id: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  popularity: number;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

//https://developers.themoviedb.org/3/collections/get-collection-details
export interface Collection {
  name: string;
  overview: string;
  backdropPath: string;
  posterPath?: string;
  parts: CollectionPart[];
}

//https://developers.themoviedb.org/3/movies/get-movie-credits
export interface MovieCreditCast {
  id: string;
  name: string;
  profilePath: string;
  creditId: string;
  gender?: number | null;
  castId?: string;
  character?: string;
  order?: number;
  popularity: number;
}

export interface MovieCreditCrew {
  id: string;
  name: string;
  profilePath: string;
  creditId: string;
  gender?: number | null;
  department?: string;
  job?: string;
  popularity: number;
}

export type MovieCredit = MovieCreditCast & MovieCreditCrew;

export interface MovieCredits {
  id: string;
  cast: MovieCreditCast[];
  crew: MovieCreditCrew[];
}

export interface Keyword {
  id: string;
  name: string;
}

export interface MovieKeywords {
  id: string;
  keywords: Keyword[];
}

export interface ReleaseDate {
  certification: string;
  iso_639_1: string;
  releaseDate: string;
  type: number;
  note: string;
}

export interface MovieReleaseDates {
  id: string;
  results: {
    iso_3166_1: string;
    releaseDates: ReleaseDate[];
  }[];
}

//https://developers.themoviedb.org/3/movies/get-movie-videos
export type MovieVideoType =
  | "Trailer"
  | "Teaser"
  | "Clip"
  | "Featurette"
  | "Behind the Scenes"
  | "Bloopers";

export type MovieVideoSize = 360 | 480 | 720 | 1080;

export type MovieVideo = {
  id: string;
  iso6391: string;
  iso31661: string;
  key: string;
  name: string;
  site: string;
  size: MovieVideoSize;
  type: MovieVideoType;
  tmdbMedia?: TmdbMedia;
};

export type MovieVideos = {
  id: string;
  results: MovieVideo[];
};

//https://developers.themoviedb.org/3/movies/get-movie-images
export interface MovieImageBackdrop {
  aspectRatio: number;
  filePath: string;
  height: number;
  iso6391: null | string;
  voteAverage: number;
  voteCount: number;
  width: number;
}

export interface MovieImagePoster {
  aspectRatio: number;
  filePath: string;
  height: number;
  iso6391: null | string;
  voteAverage: number;
  voteCount: number;
  width: number;
}

export interface MovieImages {
  id: string;
  backdrops: MovieImageBackdrop[];
  posters: MovieImagePoster[];
}

export type MovieSimilar = Paginated<Movie>;
export type MovieRecommendations = Paginated<Movie>;

//https://developers.themoviedb.org/3/people/get-person-details
export interface PersonDetailsResponse {
  birthday: string | null;
  knownForDepartment: string;
  deathday: null | string;
  id: string;
  name: string;
  alsoKnownAs: string[];
  gender: 0 | 1 | 2;
  biography: string;
  popularity: number;
  placeOfBirth: string | null;
  profilePath: string;
  adult: boolean;
  imdbId: string;
  homepage: null | string;
}

//
export type PersonMovieCreditCast = {
  character: string;
  creditId: string;
  releaseDate: string;
  voteCount: number;
  video: boolean;
  adult: boolean;
  voteAverage: number;
  title: string;
  genreIds: number[];
  originalLanguage: string;
  originalTitle: string;
  popularity: number;
  id: string;
  backdropPath: string;
  overview: string;
  posterPath: string;
};

export type PersonMovieCreditCrew = {
  id: string;
  department: string;
  originalLanguage: string;
  originalTitle: string;
  job: string;
  overview: string;
  voteCount: number;
  video: boolean;
  posterPath: string;
  backdropPath: string;
  title: string;
  popularity: number;
  genreIds: number[];
  voteAverage: number;
  adult: boolean;
  releaseDate: string;
  creditId: string;
};

export type PersonMovieCredit = PersonMovieCreditCast | PersonMovieCreditCrew;

export type PersonMovieCreditsResponse = {
  cast: PersonMovieCreditCast[];
  crew: PersonMovieCreditCrew[];
};

export type PersonProfileImage = {
  aspectRatio: number;
  filePath: string;
  height: number;
  voteAverage: number;
  voteCount: number;
  width: number;
};

export type PersonImagesResponse = {
  profiles: PersonProfileImage[];
};
