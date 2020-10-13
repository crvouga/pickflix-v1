import { AxiosRequestConfig } from "axios";
import backendAPI from "../../../backendAPI";

export type Paginated<T> = {
  page: number;
  totalPages: number;
  totalResults: number;
  results: T[];
};

export type PersonResult = {
  mediaType: "person";
  id: string;
  name: string;
  profilePath?: string | null;
  knownForDepartment: string;
};

export type MovieResult = {
  mediaType: "movie";
  id: string;
  title: string;
  posterPath?: string | null;
  releaseDate: string;
};

export type TvResult = {
  mediaType: "tv";
  id: string;
  title: string;
  posterPath?: string | null;
};

export type SearchResult = PersonResult | MovieResult | TvResult;

export type SearchParams = {
  page: number;
  query: string;
};

export const getSearchMulti = async (
  params: SearchParams,
  config?: AxiosRequestConfig
) => {
  if (params.query.length === 0) {
    return {
      page: 1,
      totalPages: 1,
      totalResults: 0,
      results: [],
    };
  }

  const { data } = await backendAPI.get<Paginated<SearchResult>>(
    "/api/tmdb/search/multi",
    {
      ...config,
      params,
    }
  );
  return data;
};
