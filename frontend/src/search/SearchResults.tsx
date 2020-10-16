import { List } from "@material-ui/core";
import matchSorter from "match-sorter";
import React from "react";
import { useSelector } from "react-redux";
import ErrorBox from "../common/components/ErrorBox";
import ListItemSkeleton from "../common/components/ListItemSkeleton";
import LoadingBox from "../common/components/LoadingBox";
import { search } from "./redux/search";
import SearchResultListItem from "./SearchResultListItem";
import useSearchQuery from "./useSearchQuery";

type Props = {
  searchQuery: string;
};

export default ({ searchQuery }: Props) => {
  const { fetchMoreRef, data, error, canFetchMore } = useSearchQuery(
    searchQuery
  );
  const searchHistory = useSelector(search.selectors.history);
  const sortedSearchHistory = matchSorter(searchHistory, searchQuery, {
    keys: ["name", "title", "mediaType"],
  });

  if (error) {
    return <ErrorBox />;
  }

  if (!data) {
    return (
      <List>
        {sortedSearchHistory.map((result) => (
          <SearchResultListItem key={result.id} result={result} />
        ))}
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
      </List>
    );
  }

  return (
    <React.Fragment>
      <List>
        {sortedSearchHistory.map((result) => (
          <SearchResultListItem key={result.id} result={result} />
        ))}
        {data.map((response) =>
          response.results
            .filter(
              (result) =>
                !Boolean(
                  sortedSearchHistory.find(
                    (historyResult) => historyResult.id === result.id
                  )
                )
            )
            .map((result) => (
              <SearchResultListItem result={result} key={result.id} />
            ))
        )}
      </List>
      {canFetchMore && <LoadingBox m={4} />}
      <div ref={fetchMoreRef} />
    </React.Fragment>
  );
};
