import { AxiosRequestConfig } from "axios";
import backendAPI from "../../../backendAPI";
import { DiscoverMovieQueryParams, DiscoverMovieResponse } from "../types";

export const getMovieGenres = async (config?: AxiosRequestConfig) => {
  const { data } = await backendAPI.get<{
    genres: { id: string; name: string }[];
  }>("/api/tmdb/genre/movie/list", config);
  return data;
};

export const getDiscoverMovie = async (params: DiscoverMovieQueryParams) => {
  const { data } = await backendAPI.get<DiscoverMovieResponse>(
    "/api/tmdb/discover/movie",
    {
      params,
    }
  );
  return data;
};

type SearchParams = {
  query: string;
  page?: number;
};

type Paginated<Result> = {
  page: number;
  totalPages: number;
  totalResults: number;
  results: Result[];
};

type PersonResult = {
  id: string;
  name: string;
  profilePath?: string | null;
};

const emptyResponse = {
  page: 1,
  totalPages: 1,
  totalResults: 0,
  results: [],
};

export const getSearchPerson = async (
  params: SearchParams,
  config?: AxiosRequestConfig
) => {
  if (params.query.length === 0) {
    return emptyResponse;
  }
  const { data } = await backendAPI.get<Paginated<PersonResult>>(
    "/api/tmdb/search/person",
    {
      ...config,
      params,
    }
  );
  return data;
};

type KeywordResult = {
  id: string;
  name: string;
};

export const getSearchKeyword = async (
  params: SearchParams,
  config?: AxiosRequestConfig
) => {
  if (params.query.length === 0) {
    return emptyResponse;
  }
  const { data } = await backendAPI.get<Paginated<KeywordResult>>(
    "/api/tmdb/search/keyword",
    {
      ...config,
      params,
    }
  );
  return data;
};

type CompanyResult = {
  id: string;
  name: string;
  logoPath?: string | null;
};

export const getSearchCompany = async (
  params: SearchParams,
  config?: AxiosRequestConfig
) => {
  if (params.query.length === 0) {
    return emptyResponse;
  }
  const { data } = await backendAPI.get<Paginated<CompanyResult>>(
    "/api/tmdb/search/company",
    {
      ...config,
      params,
    }
  );
  return data;
};
