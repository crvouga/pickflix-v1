export enum TmdbImagePath {
  profilePath = "profilePath",
  posterPath = "posterPath",
  backdropPath = "backdropPath",
  stillPath = "stillPath",
  logoPath = "logoPath",
}

export enum TmdbImageSize {
  profileSizes = "profileSizes",
  posterSizes = "posterSizes",
  backdropSizes = "backdropSizes",
  stillSizes = "stillSizes",
  logoSizes = "logoSizes",
}

export const imagePathToImageSize = {
  [TmdbImagePath.backdropPath]: TmdbImageSize.backdropSizes,
  [TmdbImagePath.logoPath]: TmdbImageSize.logoSizes,
  [TmdbImagePath.posterPath]: TmdbImageSize.posterSizes,
  [TmdbImagePath.profilePath]: TmdbImageSize.profileSizes,
  [TmdbImagePath.stillPath]: TmdbImageSize.stillSizes,
};

export interface TmdbConfiguration {
  images: {
    [key in TmdbImageSize]: string[];
  } & {
    secureBaseUrl: string;
  };
}

export type TmdbMedia = Partial<
  {
    [key in TmdbImagePath]: string;
  }
>;

export interface Movie {
  mediaType?: "movie";
  id: number;
  posterPath: string;
  title: string;
  backdropPath?: string;
  releaseDate?: string;
  overview?: string;
}

export interface Person {
  mediaType?: "person";
  id: number;
  profilePath: string;
  name: string;
}

export interface MovieReview {
  id: number;
  url: string;
  content: string;
  author: string;
}

export interface MovieReviews {
  results: MovieReview[];
}

export interface MovieGenre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  name: string;
  id: number;
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

type MovieStatus =
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
  belongsToCollection: { [key: string]: any } | null;
  budget: number;
  genres: MovieGenre[];
  homepage: string | null;
  id: number;
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
  id: number;
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

export interface Collection {
  name: string;
  overview: string;
  parts: CollectionPart[];
}

//https://developers.themoviedb.org/3/movies/get-movie-credits
export interface MovieCreditCast {
  id: number;
  name: string;
  profilePath: string;
  creditId: string;
  gender?: number | null;
  castId?: string;
  character?: string;
  order?: number;
}

export interface MovieCreditCrew {
  id: number;
  name: string;
  profilePath: string;
  creditId: string;
  gender?: number | null;
  department?: string;
  job?: string;
}

export type MovieCredit = MovieCreditCast & MovieCreditCrew;

export interface MovieCredits {
  id: number;
  cast: MovieCreditCast[];
  crew: MovieCreditCrew[];
}

export interface Keyword {
  id: number;
  name: string;
}

export interface MovieKeywords {
  id: number;
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
  id: number;
  results: {
    iso31661: string;
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

export interface MovieVideo {
  id: number;
  iso6391: string;
  iso31661: string;
  key: string;
  name: string;
  site: string;
  size: MovieVideoSize;
  type: MovieVideoType;
}

export interface MovieVideos {
  id: number;
  results: MovieVideo[];
}

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
  id: number;
  backdrops: MovieImageBackdrop[];
  posters: MovieImagePoster[];
}

export interface MovieSimilar {
  results: Movie[];
}

export interface MovieRecommendations {
  results: Movie[];
}

//https://developers.themoviedb.org/3/people/get-person-details
export interface PersonDetails {
  birthday: string | null;
  knownForDepartment: string;
  deathday: null | string;
  id: number;
  name: string;
  alsoKnownAs: string[];
  gender: 0 | 1 | 2;
  biography: string;
  popularity: number;
  placeOfBirth: string | null;
  profilePath: string | null;
  adult: boolean;
  imdbId: string;
  homepage: null | string;
}

//
interface PersonCreditCast {
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
  id: number;
  backdropPath: string | null;
  overview: string;
  posterPath: string | null;
}

interface PersonCreditCrew {
  id: number;
  department: string;
  originalLanguage: string;
  originalTitle: string;
  job: string;
  overview: string;
  voteCount: number;
  video: boolean;
  posterPath: string | null;
  backdropPath: string | null;
  title: string;
  popularity: number;
  genreIds: number[];
  voteAverage: number;
  adult: boolean;
  releaseDate: string;
  creditId: string;
}

export type PersonCredit = PersonCreditCast & PersonCreditCrew;

export interface PersonMovieCredits {
  cast: PersonCreditCast[];
  crew: PersonCreditCrew[];
}
