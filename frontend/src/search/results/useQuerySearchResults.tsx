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

export default ({ filter, text }: { filter?: SearchFilter; text: string }) => {
  const [debouncedText] = useDebounce(text, 1000 / 3);

  const query = debouncedText.substr(0, MAX_QUERY_LENGTH);

  return useInfiniteQueryPagination(
    ["search", filter, debouncedText],
    ({
      lastPage,
    }): Promise<
      Paginated<MovieResult | PersonResult | TvResult | UserResult>
    > => {
      const params: GetSearchParams = {
        page: lastPage,
        query,
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
