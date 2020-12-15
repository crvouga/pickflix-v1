import { AxiosRequestConfig } from "axios";
import matchSorter from "match-sorter";
import { useInfiniteQueryPagination } from "../../common/infinite-scroll";
import { makeEmptyPaginatedResponse, Paginated } from "../../common/types";
import {
  CompanyResult,
  getSearchCompany,
  getSearchKeyword,
  GetSearchParams,
  getSearchPerson,
  KeywordResult,
  PersonResult,
  useSearchQuery,
} from "../../search/query";

export enum DiscoverTagsSearchFilter {
  Keyword = "Keyword",
  Company = "Company",
  Person = "Person",
}

export const getSearchDiscoverAll = async (
  params: GetSearchParams,
  config?: AxiosRequestConfig
): Promise<Paginated<CompanyResult | KeywordResult | PersonResult>> => {
  if (params.query.length === 0) {
    return makeEmptyPaginatedResponse<
      CompanyResult | KeywordResult | PersonResult
    >();
  }

  const [companyResponse, keywordResponse, personResponse] = await Promise.all([
    getSearchCompany(params, config),
    getSearchKeyword(params, config),
    getSearchPerson(params, config),
  ]);

  const results = matchSorter(
    [
      ...companyResponse.results,
      ...keywordResponse.results,
      ...personResponse.results,
    ],
    params.query,
    {
      keys: ["name"],
    }
  );

  return {
    ...companyResponse,
    ...keywordResponse,
    ...personResponse,
    results,
  };
};

const getSearchDiscover = async (
  params: GetSearchParams,
  filter?: DiscoverTagsSearchFilter,
  config?: AxiosRequestConfig
): Promise<Paginated<CompanyResult | KeywordResult | PersonResult>> => {
  switch (filter) {
    case DiscoverTagsSearchFilter.Company:
      return getSearchCompany(params);
    case DiscoverTagsSearchFilter.Keyword:
      return getSearchKeyword(params);
    case DiscoverTagsSearchFilter.Person:
      return getSearchPerson(params);
  }
  return getSearchDiscoverAll(params);
};

export const useQuerySearchDiscoverTags = ({
  filter,
  text,
  debounceTimeout,
}: {
  filter?: DiscoverTagsSearchFilter;
  text: string;
  debounceTimeout?: number;
}) => {
  const searchQuery = useSearchQuery({ text, debounceTimeout });

  return useInfiniteQueryPagination(
    ["search", "discover", filter, searchQuery],
    ({ lastPage }) => {
      return getSearchDiscover(
        {
          page: lastPage,
          query: searchQuery,
        },
        filter
      );
    }
  );
};
