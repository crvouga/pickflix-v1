import { AxiosRequestConfig } from "axios";
import matchSorter from "match-sorter";
import { BackendAPI } from "../../backend-api";
import { makeEmptyPaginatedResponse, Paginated } from "../../common/types";
import { User } from "../../user/query";

/* 


*/

export type UserResult = User;

export type PersonResult = {
  type: "person";
  id: string;
  name: string;
  profilePath?: string | null;
  knownForDepartment: string;
};

export type MovieResult = {
  type: "movie";
  id: string;
  title: string;
  posterPath?: string | null;
  releaseDate: string;
};

export type TvResult = {
  type: "tv";
  id: string;
  title: string;
  posterPath?: string | null;
};

export type MultiResult =
  | (PersonResult & { mediaType: "person" })
  | (MovieResult & { mediaType: "movie" })
  | (TvResult & { mediaType: "tv" });

export type SearchResult = PersonResult | MovieResult | TvResult | UserResult;

/* 


*/

export type GetSearchParams = {
  page?: number;
  query: string;
};

export const getSearchMulti = async (
  params: GetSearchParams,
  config?: AxiosRequestConfig
): Promise<Paginated<PersonResult | MovieResult | TvResult>> => {
  if (params.query.length === 0) {
    return makeEmptyPaginatedResponse<PersonResult | MovieResult | TvResult>();
  }

  const { data } = await BackendAPI.get<Paginated<MultiResult>>(
    `/api/tmdb/search/multi`,
    {
      ...config,
      params,
    }
  );

  return {
    ...data,
    results: data.results.map((result) => {
      switch (result.mediaType) {
        case "movie":
          return {
            ...result,
            type: "movie",
          };
        case "person":
          return {
            ...result,
            type: "person",
          };
        case "tv":
          return {
            ...result,
            type: "tv",
          };
      }
    }),
  };
};

export const getSearchPerson = async (
  params: GetSearchParams,
  config?: AxiosRequestConfig
): Promise<Paginated<PersonResult>> => {
  if (params.query.length === 0) {
    return makeEmptyPaginatedResponse<PersonResult>();
  }
  const { data } = await BackendAPI.get<Paginated<PersonResult>>(
    `/api/tmdb/search/person`,
    {
      ...config,
      params,
    }
  );
  return {
    ...data,
    results: data.results.map((result) => ({
      ...result,
      type: "person",
    })),
  };
};

export const getSearchMovie = async (
  params: GetSearchParams,
  config?: AxiosRequestConfig
): Promise<Paginated<MovieResult>> => {
  if (params.query.length === 0) {
    return makeEmptyPaginatedResponse<MovieResult>();
  }
  const { data } = await BackendAPI.get<Paginated<MovieResult>>(
    `/api/tmdb/search/movie`,
    {
      ...config,
      params,
    }
  );
  return {
    ...data,
    results: data.results.map((result) => ({
      ...result,
      type: "movie",
    })),
  };
};

export const getSearchUsers = async (
  params: GetSearchParams,
  config?: AxiosRequestConfig
): Promise<Paginated<UserResult>> => {
  if (params.query.length === 0) {
    return makeEmptyPaginatedResponse<UserResult>();
  }
  const { data } = await BackendAPI.get<Paginated<UserResult>>(
    `/api/search/users`,
    {
      ...config,
      params,
    }
  );
  return {
    ...data,
    results: data.results.map((result) => ({
      ...result,
      type: "user",
    })),
  };
};

export const getSearchAll = async (
  params: GetSearchParams,
  config?: AxiosRequestConfig
): Promise<Paginated<UserResult | MovieResult | PersonResult | TvResult>> => {
  if (params.query.length === 0) {
    return makeEmptyPaginatedResponse<
      UserResult | MovieResult | PersonResult | TvResult
    >();
  }

  const [userResponse, multiResponse] = await Promise.all([
    getSearchUsers(params, config),
    getSearchMulti(params, config),
  ]);

  const results = matchSorter(
    [...userResponse.results, ...multiResponse.results],
    params.query,
    {
      keys: ["username", "displayName", "title", "name"],
    }
  );

  return {
    ...userResponse,
    ...multiResponse,
    results,
  };
};
