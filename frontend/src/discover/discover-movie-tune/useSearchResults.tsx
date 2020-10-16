import matchSorter from "match-sorter";
import { uniqBy } from "ramda";
import { useSelector } from "react-redux";
import { DiscoverMovieTag } from "../discover-movie-tags";
import { discoverMovie } from "../redux/discover-movie";
import useSearchQuery from "./useSearchQuery";

type Props = {
  searchQuery: string;
};

const filter = (searchQuery: string, tags: DiscoverMovieTag[]) => {
  return matchSorter(tags, searchQuery, {
    keys: ["name"],
  });
};

export default ({ searchQuery }: Props) => {
  const tags = useSelector(discoverMovie.selectors.tags);
  const filteredTags = filter(searchQuery, tags);

  const {
    personSearchQuery,
    keywordSearchQuery,
    companySearchQuery,
  } = useSearchQuery({ searchQuery });

  if (
    !personSearchQuery.data ||
    !keywordSearchQuery.data ||
    !companySearchQuery.data
  ) {
    return {
      isLoading: true,
      tags: filteredTags,
    };
  }

  const withPeopleTags: DiscoverMovieTag[] = personSearchQuery.data.results.map(
    (result) => ({
      type: "withPeople",
      ...result,
    })
  );

  const withKeywordsTags: DiscoverMovieTag[] = keywordSearchQuery.data.results.map(
    (result) => ({
      type: "withKeywords",
      ...result,
    })
  );

  const withCompaniesTags: DiscoverMovieTag[] = companySearchQuery.data.results.map(
    (result) => ({
      type: "withCompanies",
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
