import { useDebounce } from "use-debounce/lib";
import useInfiniteQueryPagination from "../../common/hooks/useInfiniteQueryPagination";
import { Paginated } from "../../common/types";
import {
  getSearchAll,
  getSearchMovie,
  GetSearchParams,
  getSearchPerson,
  getSearchUsers,
  MovieResult,
  PersonResult,
  TvResult,
  UserResult,
} from "../query";
import { SearchFilter } from "../redux/search";

const MAX_QUERY_LENGTH = 100;
const DEBOUNCE_TIMEOUT = 1000 / 3;

const deduplicateWhitespace = (string: string) => string.replace(/\s+/g, " ");

const textToSearchQuery = (text: string) =>
  deduplicateWhitespace(text.trim()).substr(0, MAX_QUERY_LENGTH);

export default ({ filter, text }: { filter?: SearchFilter; text: string }) => {
  const [searchQuery] = useDebounce(textToSearchQuery(text), DEBOUNCE_TIMEOUT);

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
