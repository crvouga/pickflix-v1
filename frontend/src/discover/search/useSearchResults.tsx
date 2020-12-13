import matchSorter from "match-sorter";
import { uniqBy } from "ramda";
import { useDebounce } from "use-debounce";
import { IDiscoverMovieTag, TagType } from "../query/types";
import useDiscoverState from "../useDiscoverState";
import useSearchQuery from "./useSearchQuery";

type Props = {
  searchQuery: string;
};

const filter = (searchQuery: string, tags: IDiscoverMovieTag[]) => {
  return matchSorter(tags, searchQuery, {
    keys: ["name"],
  });
};

export default ({ searchQuery }: Props) => {
  const { tags } = useDiscoverState();

  const filteredTags = filter(searchQuery, tags);

  const [debounced] = useDebounce(searchQuery, 500);

  const {
    personSearchQuery,
    keywordSearchQuery,
    companySearchQuery,
  } = useSearchQuery({ searchQuery: debounced });

  if (
    !personSearchQuery.data ||
    !keywordSearchQuery.data ||
    !companySearchQuery.data ||
    debounced !== searchQuery
  ) {
    return {
      isLoading: true,
      tags: filteredTags,
    };
  }

  const withPeopleTags: IDiscoverMovieTag[] = personSearchQuery.data.results.map(
    (result) => ({
      type: TagType.withPeople,
      ...result,
    })
  );

  const withKeywordsTags: IDiscoverMovieTag[] = keywordSearchQuery.data.results.map(
    (result) => ({
      type: TagType.withKeywords,
      ...result,
    })
  );

  const withCompaniesTags: IDiscoverMovieTag[] = companySearchQuery.data.results.map(
    (result) => ({
      type: TagType.withCompanies,
      ...result,
    })
  );

  const searchResultTags = [
    ...withPeopleTags,
    ...withKeywordsTags,
    ...withCompaniesTags,
  ];

  const filteredSearchResultTags = filter(searchQuery, searchResultTags);

  return {
    isLoading: false,
    tags: uniqBy((tag) => tag.id, [
      ...filteredTags,
      ...filteredSearchResultTags,
    ]),
  };
};
