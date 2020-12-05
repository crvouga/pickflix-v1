import { AxiosRequestConfig } from "axios";
import matchSorter from "match-sorter";
import { useDebounce } from "use-debounce/lib";
import { BackendAPI } from "../../backend-api";
import { useInfiniteQueryPagination } from "../../common/infinite-scroll";
import { makeEmptyPaginatedResponse, Paginated } from "../../common/types";
import { User } from "../../user/query";

/* 


*/

export enum SearchFilter {
  movie = "movie",
  person = "person",
  user = "user",
}
export const toSearchFilterName = (filter: SearchFilter) => {
  return {
    [SearchFilter.movie]: "Movies",
    [SearchFilter.person]: "People",
    [SearchFilter.user]: "Users",
  }[filter];
};
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

const MAX_QUERY_LENGTH = 100;
const DEBOUNCE_TIMEOUT = 1000 / 3;

const deduplicateWhitespace = (string: string) => string.replace(/\s+/g, " ");

const textToSearchQuery = (text: string) =>
  deduplicateWhitespace(text.trim()).substr(0, MAX_QUERY_LENGTH);

const useSearchQuery = ({
  text,
  debounceTimeout = DEBOUNCE_TIMEOUT,
}: {
  text: string;
  debounceTimeout?: number;
}) => {
  const [searchQuery] = useDebounce(textToSearchQuery(text), debounceTimeout);
  return searchQuery;
};

export const useQuerySearchResults = ({
  filter,
  text,
  debounceTimeout = DEBOUNCE_TIMEOUT,
}: {
  filter?: SearchFilter;
  text: string;
  debounceTimeout?: number;
}) => {
  const searchQuery = useSearchQuery({ text, debounceTimeout });

  return useInfiniteQueryPagination(
    ["search", filter, searchQuery],
    ({
      lastPage,
    }): Promise<
      Paginated<MovieResult | PersonResult | TvResult | UserResult>
    > => {
      const params: GetSearchParams = {
        page: lastPage,
        query: searchQuery,
      };
      switch (filter) {
        case "movie":
          return getSearchMovie(params);
        case "person":
          return getSearchPerson(params);
        case "user":
          return getSearchUsers(params);
      }
      return getSearchAll(params);
    }
  );
};

export const useQuerySearchUsers = (params: {
  text: string;
  debounceTimeout?: number;
}) => {
  const searchQuery = useSearchQuery(params);

  return useInfiniteQueryPagination(
    ["search", "users", searchQuery],
    ({ lastPage }): Promise<Paginated<UserResult>> => {
      const params: GetSearchParams = {
        page: lastPage,
        query: searchQuery,
      };
      return getSearchUsers(params);
    }
  );
};

export const useQuerySearchMovies = (params: {
  text: string;
  debounceTimeout?: number;
}) => {
  const searchQuery = useSearchQuery(params);

  return useInfiniteQueryPagination(
    ["search", "movies", searchQuery],
    ({ lastPage }): Promise<Paginated<MovieResult>> => {
      const params: GetSearchParams = {
        page: lastPage,
        query: searchQuery,
      };
      return getSearchMovie(params);
    }
  );
};
