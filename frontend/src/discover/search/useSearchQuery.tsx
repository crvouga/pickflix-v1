import { useQuery } from "react-query";
import { makeCancelable } from "../../common/utility";
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
  const query = encodeURI(searchQuery.trim());
  const personSearchQuery = useQuery(queryKeys.personSearch(query), () =>
    makeCancelable(getSearchPerson({ query }))
  );
  const keywordSearchQuery = useQuery(queryKeys.keywordSearch(query), () =>
    makeCancelable(getSearchKeyword({ query }))
  );
  const companySearchQuery = useQuery(queryKeys.companySearch(query), () =>
    makeCancelable(getSearchCompany({ query }))
  );

  return {
    personSearchQuery,
    companySearchQuery,
    keywordSearchQuery,
  };
};
