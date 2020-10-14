import { useQuery } from "react-query";
import { useDebounce } from "use-debounce";
import { makeCancelable } from "../../utils";
import {
  getSearchCompany,
  getSearchKeyword,
  getSearchPerson,
  queryKeys,
} from "../query";

type Props = {
  searchQuery: string;
};

export default ({ searchQuery }: Props) => {
  const [debounced] = useDebounce(encodeURI(searchQuery.trim()), 500);

  const personSearchQuery = useQuery(queryKeys.personSearch(debounced), () =>
    makeCancelable(getSearchPerson({ query: debounced }))
  );

  const keywordSearchQuery = useQuery(queryKeys.keywordSearch(debounced), () =>
    makeCancelable(getSearchKeyword({ query: debounced }))
  );

  const companySearchQuery = useQuery(queryKeys.companySearch(debounced), () =>
    makeCancelable(getSearchCompany({ query: debounced }))
  );

  return {
    personSearchQuery,
    companySearchQuery,
    keywordSearchQuery,
  };
};
