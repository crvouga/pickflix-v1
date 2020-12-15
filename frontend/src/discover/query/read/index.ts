import { AxiosRequestConfig } from "axios";
import { BackendAPI } from "../../../backend-api";
import { Paginated } from "../../../common/types";
import { DiscoverMovieQueryParams, DiscoverMovieResponse } from "../types";

type Certification = {
  certification: string;
  meaning: string;
  order: number;
};
type CountryCode = "US";
type MovieCertificationResponse = {
  certifications: { [key in CountryCode]: Certification[] };
};

export const getMovieCertifications = async (config?: AxiosRequestConfig) => {
  const { data } = await BackendAPI.get<MovieCertificationResponse>(
    "/api/tmdb/certification/movie/list",
    config
  );
  return data;
};

export const getMovieGenres = async (config?: AxiosRequestConfig) => {
  const { data } = await BackendAPI.get<{
    genres: { id: string; name: string }[];
  }>("/api/tmdb/genre/movie/list", config);
  return data;
};

export const getDiscoverMovie = async (params: DiscoverMovieQueryParams) => {
  const { data } = await BackendAPI.get<DiscoverMovieResponse>(
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
  const { data } = await BackendAPI.get<Paginated<PersonResult>>(
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

type CompanyResult = {
  id: string;
  name: string;
  logoPath?: string | null;
};

export const getSearchKeyword = async (
  params: SearchParams,
  config?: AxiosRequestConfig
) => {
  if (params.query.length === 0) {
    return emptyResponse;
  }
  const { data } = await BackendAPI.get<Paginated<KeywordResult>>(
    "/api/tmdb/search/keyword",
    {
      ...config,
      params,
    }
  );
  return data;
};

export const getSearchCompany = async (
  params: SearchParams,
  config?: AxiosRequestConfig
) => {
  if (params.query.length === 0) {
    return emptyResponse;
  }
  const { data } = await BackendAPI.get<Paginated<CompanyResult>>(
    "/api/tmdb/search/company",
    {
      ...config,
      params,
    }
  );
  return data;
};
