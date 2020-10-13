import { AxiosRequestConfig } from "axios";
import backendAPI from "../../../backendAPI";
import { DiscoverMovieParams, DiscoverMovieResponse } from "../types";

export const getDiscoverMovie = async (params: DiscoverMovieParams) => {
  const { data } = await backendAPI.get<DiscoverMovieResponse>(
    "/api/tmdb/discover/movie",
    {
      params,
    }
  );
  return data;
};

export const getSearchPerson = async (config: AxiosRequestConfig) => {
  const { data } = await backendAPI.get("/api/tmdb/search/person", config);
  return data;
};

export const getSearchKeyword = async (config: AxiosRequestConfig) => {
  const { data } = await backendAPI.get("/api/tmdb/search/keyword", config);
  return data;
};

export const getSearchCompany = async (config: AxiosRequestConfig) => {
  const { data } = await backendAPI.get("/api/tmdb/search/company", config);
  return data;
};
