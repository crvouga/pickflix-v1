import { DiscoverMovieParams, DiscoverMovieSortBy } from "./query/types";

/*

*/

export type DateRangeTag = {
  type: "dateRange";
  id: string;
  name?: string;
  value: [Date, Date];
};

export type WithGenresTag = {
  type: "withGenres";
  id: string;
  name: string;
};

export type WithPeopleTag = {
  type: "withPeople";
  id: string;
  name: string;
  profilePath?: string | null;
};

export type WithCompaniesTag = {
  type: "withCompanies";
  id: string;
  name: string;
  logoPath?: string | null;
};

export type WithKeywordsTag = {
  type: "withKeywords";
  id: string;
  name: string;
};

export type DiscoverMovieTag =
  | WithGenresTag
  | WithPeopleTag
  | WithCompaniesTag
  | WithKeywordsTag
  | DateRangeTag;

/* 

*/

const tagToParamReducer = (
  params: DiscoverMovieParams,
  tag: DiscoverMovieTag
) => {
  switch (tag.type) {
    case "dateRange":
      return {
        ...params,
      };

    case "withPeople":
      return {
        ...params,
        withPeople: [...(params.withPeople || []), tag.id],
      };

    case "withGenres":
      return {
        ...params,
        withGenres: [...(params.withGenres || []), tag.id],
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

export const tagsToParams = (tags: DiscoverMovieTag[]) => {
  return tags.reduce(tagToParamReducer, {});
};

export const dateRangeTagToName = (tag: DateRangeTag) => {
  if (tag.name) {
    return tag.name;
  }
  const [left, right] = tag.value;
  return "Date";
};
