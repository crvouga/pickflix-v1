// SOURCE: https://developers.themoviedb.org/3/discover/movie-discover

export type SortByKey =
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

export const sortByKeys: SortByKey[] = [
  "popularity.asc",
  "popularity.desc",
  "release_date.asc",
  "release_date.desc",
  "revenue.asc",
  "revenue.desc",
  "primary_release_date.asc",
  "primary_release_date.desc",
  "original_title.asc",
  "original_title.desc",
  "vote_average.asc",
  "vote_average.desc",
  "vote_count.asc",
  "vote_count.desc",
];

export const sortByKeyToName = (sortByKey: SortByKey): string =>
  ({
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
}

export const uniqueTagTypes = [
  TagType.certification,
  TagType.releaseYearRange,
  TagType.sortBy,
];

type BaseTag = {
  id: string;
  lastActiveAt?: number;
};

export type CertificationTag = {
  type: TagType.certification;
  certificationCountry: string;
  certification: string;
};

export type ReleaseYearRangeTag = {
  type: TagType.releaseYearRange;
  range: [number, number];
};

export type SortByTag = {
  type: TagType.sortBy;
  sortBy: SortByKey;
};

export type WithGenresTag = {
  type: TagType.withGenres;
  name: string;
};

export type WithPeopleTag = {
  type: TagType.withPeople;
  name: string;
  profilePath?: string | null;
};

export type WithCompaniesTag = {
  type: TagType.withCompanies;
  name: string;
  logoPath?: string | null;
};

export type WithKeywordsTag = {
  type: TagType.withKeywords;
  name: string;
};

export type IDiscoverTag = BaseTag &
  (
    | WithGenresTag
    | WithPeopleTag
    | WithCompaniesTag
    | WithKeywordsTag
    | ReleaseYearRangeTag
    | SortByTag
    | CertificationTag
  );

const tagToParamReducer = (
  params: DiscoverMovieQueryParams,
  tag: IDiscoverTag
) => {
  switch (tag.type) {
    case "certification":
      const { certification, certificationCountry } = tag;
      return {
        ...params,
        certification,
        certificationCountry,
      };

    case "sortBy":
      const { sortBy } = tag;
      return {
        ...params,
        sortBy,
      };

    case "releaseYearRange":
      const { range } = tag;
      return {
        ...params,
        "primaryReleaseDate.gte": `${range[0]}-01-01`,
        "primaryReleaseDate.lte": `${range[1]}-12-31`,
      };

    case "withPeople":
      return {
        ...params,
        withPeople: [...(params?.withPeople || []), tag.id],
      };

    case "withGenres":
      return {
        ...params,
        withGenres: [...(params?.withGenres || []), tag.id],
      };

    case "withCompanies":
      return {
        ...params,
        withCompanies: [...(params?.withCompanies || []), tag.id],
      };

    case "withKeywords":
      return {
        ...params,
        withKeywords: [...(params?.withKeywords || []), tag.id],
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

export const paramsToTags = (
  params: DiscoverMovieQueryParams
): IDiscoverTag[] => {
  const tags: IDiscoverTag[] = [];

  if (params.certification && params.certificationCountry) {
    const { certification, certificationCountry } = params;
    const tag: IDiscoverTag = {
      type: TagType.certification,
      id: certification,
      certification,
      certificationCountry,
    };
    tags.push(tag);
  }

  if (params.sortBy) {
    const tag: IDiscoverTag = {
      type: TagType.sortBy,
      id: params.sortBy,
      sortBy: params.sortBy,
    };
    tags.push(tag);
  }

  if (params["primaryReleaseDate.gte"] && params["primaryReleaseDate.lte"]) {
    const gte = Number(params["primaryReleaseDate.gte"].split("-")[0]);
    const lte = Number(params["primaryReleaseDate.lte"].split("-")[0]);
    const range: [number, number] = [gte, lte];
    const tag: IDiscoverTag = {
      type: TagType.releaseYearRange,
      id: range.toString(),
      range,
    };
    tags.push(tag);
  }

  if (params.withPeople) {
    for (const personId of params.withPeople) {
    }
  }
  return tags;
};

/* 


*/

export const getCurrentDecade = () =>
  Math.floor(new Date().getFullYear() / 10) * 10;

export const range = (start: number, end: number, step: number) => {
  const numbers: number[] = [];
  for (let n = start; n < end; n += step) {
    numbers.push(n);
  }
  return numbers;
};

export type YearRange = [number, number];

export const getDecades = (): YearRange[] =>
  range(1890, getCurrentDecade() + 10, 10).map((_) => [_, _ + 9]);

const isDecade = ([left, right]: YearRange) =>
  right - left === 9 && left % 10 === 0;

export const yearRangeToName = (yearRange: YearRange) => {
  if (isDecade(yearRange)) {
    return `${yearRange[0]}s`;
  }
  return `${yearRange[0]} - ${yearRange[1]}`;
};
