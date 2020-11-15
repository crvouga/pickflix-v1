import { AxiosRequestConfig } from "axios";
import { BackendAPI } from "../../../backend-api";
import { Paginated, makeEmptyPaginatedResponse } from "../../../common/types";

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
    return makeEmptyPaginatedResponse<SearchResult>();
  }

  const { data } = await BackendAPI.get<Paginated<SearchResult>>(
    "/api/tmdb/search/multi",
    {
      ...config,
      params,
    }
  );
  return data;
};
