import matchSorter from "match-sorter";
import { uniqBy } from "ramda";
import { useDebounce } from "use-debounce";
import { IDiscoverTag, TagType } from "../query/types";
import useDiscoverState from "../redux/useDiscoverState";
import useSearchQuery from "./useSearchQuery";

type Props = {
  searchQuery: string;
};

const filter = (searchQuery: string, tags: IDiscoverTag[]) => {
  return matchSorter(tags, searchQuery, {
    keys: ["name"],
  });
};

export default ({ searchQuery }: Props) => {
  const { tagState } = useDiscoverState();

  const filteredTags = filter(searchQuery, Object.values(tagState.tagsById));

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

  const withPeopleTags: IDiscoverTag[] = personSearchQuery.data.results.map(
    (result) => ({
      type: TagType.withPeople,
      ...result,
    })
  );

  const withKeywordsTags: IDiscoverTag[] = keywordSearchQuery.data.results.map(
    (result) => ({
      type: TagType.withKeywords,
      ...result,
    })
  );

  const withCompaniesTags: IDiscoverTag[] = companySearchQuery.data.results.map(
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
