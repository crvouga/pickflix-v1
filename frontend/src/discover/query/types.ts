import { rangeStep } from "../../common/utility";

// SOURCE: https://developers.themoviedb.org/3/discover/movie-discover
export type SortByKey =
  | "popularity.asc"
  | "popularity.desc"
  // | "release_date.asc"
  // | "release_date.desc"
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

export const SORT_BY_KEYS: SortByKey[] = [
  "popularity.desc",
  "revenue.desc",
  "vote_average.desc",
  "vote_count.desc",
  "primary_release_date.desc",
  "popularity.asc",
  "revenue.asc",
  "vote_average.asc",
  "vote_count.asc",
  "primary_release_date.asc",
  "original_title.asc",
  "original_title.desc",
];

export const sortByKeyToName = (sortByKey: SortByKey): string =>
  ({
    "popularity.asc": "Least Popular",
    "popularity.desc": "Most Popular",
    "revenue.desc": "Biggest Box Office",
    "revenue.asc": "Smallest Box Office",
    "vote_average.desc": "Highest Rated",
    "vote_average.asc": "Lowest Rated",
    "primary_release_date.desc": "Newest",
    "primary_release_date.asc": "Oldest",
    "original_title.asc": "A to Z",
    "original_title.desc": "Z to A",
    "vote_count.desc": "Most Votes",
    "vote_count.asc": "Least Votes",
  }[sortByKey]);

export enum SortByKeyEnum {
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

export type DiscoverMovieQueryParams = {
  language?: string;
  region?: string;
  sortBy?: SortByKey;
  certification_country?: string;
  certification?: string;
  "certification.lte"?: string;
  "certification.gte"?: string;
  includeAdult?: boolean;
  includeVideo?: boolean;
  page?: number;
  primary_release_year?: number;
  "primary_release_date.gte"?: string;
  "primary_release_date.lte"?: string;
  "release_date.gte"?: string;
  "release_date.lte"?: string;
  with_release_type?: number;
  year?: number;
  "vote_count.gte"?: number;
  "vote_count.lte"?: number;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  with_cast?: string[];
  with_crew?: string[];
  with_people?: string[];
  with_companies?: string[];
  with_genres?: string[];
  without_genres?: string[];
  with_keywords?: string[];
  without_keywords?: string[];
  "with_runtime.gte"?: number;
  "with_runtime.lte"?: number;
  with_original_language?: string;
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

/*

*/

export enum TagType {
  certification = "certification",
  releaseYearRange = "releaseYearRange",
  sortBy = "sortBy",
  withGenres = "withGenres",
  withPeople = "withPeople",
  withKeywords = "withKeywords",
  withCompanies = "withCompanies",
  runtimeLte = "runtimeLte",
  runtimeGte = "runtimeGte",
  voteCountLte = "voteCountLte",
  voteCountGte = "voteCountGte",
  voteAverageLte = "voteAverageLte",
  voteAverageGte = "voteAverageGte",
}

export const UNIQUE_TAG_TYPES = {
  [TagType.certification]: TagType.certification,
  [TagType.releaseYearRange]: TagType.releaseYearRange,
  [TagType.sortBy]: TagType.sortBy,

  [TagType.runtimeLte]: TagType.runtimeLte,
  [TagType.runtimeGte]: TagType.runtimeGte,

  [TagType.voteAverageGte]: TagType.voteAverageGte,
  [TagType.voteAverageLte]: TagType.voteAverageLte,

  [TagType.voteCountGte]: TagType.voteCountGte,
  [TagType.voteCountLte]: TagType.voteCountLte,
};

type BaseTag = {
  id: string;
  lastActiveAt?: number;
};

export type VoteCountLteTag = BaseTag & {
  type: TagType.voteCountLte;
  voteCount: number;
};

export type VoteCountGteTag = BaseTag & {
  type: TagType.voteCountGte;
  voteCount: number;
};

export type VoteAverageLteTag = BaseTag & {
  type: TagType.voteAverageLte;
  voteAverage: number;
};

export type VoteAverageGteTag = BaseTag & {
  type: TagType.voteAverageGte;
  voteAverage: number;
};

export type RuntimeLteTag = BaseTag & {
  type: TagType.runtimeLte;
  runtime: number;
};

export type RuntimeGteTag = BaseTag & {
  type: TagType.runtimeGte;
  runtime: number;
};

export type CertificationTag = BaseTag & {
  type: TagType.certification;
  certificationCountry: string;
  certification: string;
};

export type ReleaseYearRangeTag = BaseTag & {
  type: TagType.releaseYearRange;
  range: [number, number];
};

export type SortByTag = BaseTag & {
  type: TagType.sortBy;
  sortBy: SortByKey;
};

export type WithGenresTag = BaseTag & {
  type: TagType.withGenres;
  name: string;
};

export type WithPeopleTag = BaseTag & {
  type: TagType.withPeople;
  name: string;
  profilePath?: string | null;
};

export type WithCompaniesTag = BaseTag & {
  type: TagType.withCompanies;
  name: string;
  logoPath?: string | null;
};

export type WithKeywordsTag = BaseTag & {
  type: TagType.withKeywords;
  name: string;
};

export type IDiscoverTag =
  | WithGenresTag
  | WithPeopleTag
  | WithCompaniesTag
  | WithKeywordsTag
  | ReleaseYearRangeTag
  | SortByTag
  | CertificationTag
  | RuntimeGteTag
  | RuntimeLteTag
  | VoteCountGteTag
  | VoteCountLteTag
  | VoteAverageGteTag
  | VoteAverageLteTag;

const tagToParamReducer = (
  params: DiscoverMovieQueryParams,
  tag: IDiscoverTag
): DiscoverMovieQueryParams => {
  switch (tag.type) {
    case TagType.voteCountGte:
      return {
        ...params,
        "vote_count.gte": tag.voteCount,
      };

    case TagType.voteCountLte:
      return {
        ...params,
        "vote_count.lte": tag.voteCount,
      };

    case TagType.voteAverageGte:
      return {
        ...params,
        "vote_average.gte": tag.voteAverage,
      };

    case TagType.voteAverageLte:
      return {
        ...params,
        "vote_average.lte": tag.voteAverage,
      };

    case TagType.certification:
      const { certification, certificationCountry } = tag;
      return {
        ...params,
        certification,
        certification_country: certificationCountry,
      };

    case TagType.sortBy:
      const { sortBy } = tag;
      return {
        ...params,
        sortBy,
      };

    case TagType.runtimeGte:
      return {
        ...params,
        "with_runtime.gte": tag.runtime,
      };

    case TagType.runtimeLte:
      return {
        ...params,
        "with_runtime.lte": tag.runtime,
      };

    case TagType.releaseYearRange:
      return {
        ...params,
        "primary_release_date.gte": `${tag.range[0]}-01-01`,
        "primary_release_date.lte": `${tag.range[1]}-12-31`,
      };

    case TagType.withPeople:
      return {
        ...params,
        with_people: [...(params?.with_people || []), tag.id],
      };

    case TagType.withGenres:
      return {
        ...params,
        with_genres: [...(params?.with_genres || []), tag.id],
      };

    case TagType.withCompanies:
      return {
        ...params,
        with_companies: [...(params?.with_companies || []), tag.id],
      };

    case TagType.withKeywords:
      return {
        ...params,
        with_keywords: [...(params?.with_keywords || []), tag.id],
      };

    default:
      return params;
  }
};

export const tagsToParams = (
  tags: IDiscoverTag[]
): DiscoverMovieQueryParams => {
  return tags.reduce(tagToParamReducer, {});
};

/* 


*/

export const getCurrentDecade = () =>
  Math.floor(new Date().getFullYear() / 10) * 10;

export const getDecades = (): [number, number][] =>
  rangeStep(1890, getCurrentDecade() + 10, 10).map((_) => [_, _ + 9]);

const isDecade = ([left, right]: [number, number]) =>
  right - left === 9 && left % 10 === 0;

export const yearRangeToName = (yearRange: [number, number]) => {
  if (isDecade(yearRange)) {
    return `${yearRange[0]}s`;
  }
  return `${yearRange[0]} - ${yearRange[1]}`;
};

/* 


*/

export const RELEASE_YEAR_TAGS: IDiscoverTag[] = getDecades()
  .reverse()
  .map((decade) => ({
    type: TagType.releaseYearRange,
    id: decade.toString(),
    range: decade,
  }));

const RUNTIMES = [30, ...rangeStep(60, 60 * 5, 60)];

export const RUNTIME_GTE_TAGS: IDiscoverTag[] = RUNTIMES.map((runtime) => ({
  type: TagType.runtimeGte,
  id: [TagType.runtimeGte, runtime].toString(),
  runtime,
}));

export const RUNTIME_LTE_TAGS: IDiscoverTag[] = RUNTIMES.map((runtime) => ({
  type: TagType.runtimeLte,
  id: [TagType.runtimeLte, runtime].toString(),
  runtime,
}));

export const SORT_BY_TAGS: IDiscoverTag[] = SORT_BY_KEYS.map((sortByKey) => ({
  type: TagType.sortBy,
  id: sortByKey,
  sortBy: sortByKey,
}));

const VOTE_AVERAGES = rangeStep(1, 11, 1);

export const VOTE_AVERAGE_GTE_TAGS: IDiscoverTag[] = VOTE_AVERAGES.map(
  (voteAverage) => ({
    id: [TagType.voteAverageGte, voteAverage].toString(),
    type: TagType.voteAverageGte,
    voteAverage,
  })
);

export const VOTE_AVERAGE_LTE_TAGS: IDiscoverTag[] = VOTE_AVERAGES.map(
  (voteAverage) => ({
    id: [TagType.voteAverageLte, voteAverage].toString(),
    type: TagType.voteAverageLte,
    voteAverage,
  })
);

const VOTE_COUNTS = rangeStep(0, 11000, 1000);

export const VOTE_COUNT_LTE_TAGS: IDiscoverTag[] = VOTE_COUNTS.map(
  (voteCount) => ({
    id: [TagType.voteCountLte, voteCount].toString(),
    type: TagType.voteCountLte,
    voteCount,
  })
);

export const VOTE_COUNT_GTE_TAGS: IDiscoverTag[] = VOTE_COUNTS.map(
  (voteCount) => ({
    id: [TagType.voteCountGte, voteCount].toString(),
    type: TagType.voteCountGte,
    voteCount,
  })
);
