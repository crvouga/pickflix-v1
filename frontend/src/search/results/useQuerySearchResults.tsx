import useInfiniteQueryPagination from "../../common/hooks/useInfiniteQueryPagination";
import {
  getSearchMovie,
  getSearchMulti,
  GetSearchParams,
  getSearchPerson,
} from "../query";
import { SearchFilter } from "../redux/search";
import { useDebounce } from "use-debounce/lib";

const MAX_QUERY_LENGTH = 100;

export default ({ filter, text }: { filter?: SearchFilter; text: string }) => {
  const [debouncedText] = useDebounce(text, 1000 / 3);

  const query = debouncedText.substr(0, MAX_QUERY_LENGTH);

  return useInfiniteQueryPagination(
    ["search", filter, debouncedText],
    ({ lastPage }) => {
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
          return getSearchPerson(params);
      }
      return getSearchMulti(params);
    }
  );
};
