import { List } from "@material-ui/core";
import React from "react";
import ErrorBox from "../common/components/ErrorBox";
import ListItemSkeleton from "../common/components/ListItemSkeleton";
import LoadingBox from "../common/components/LoadingBox";
import SearchResultListItem from "./SearchResultListItem";
import useSearchQuery from "./useSearchQuery";

type Props = {
  text: string;
};

export default ({ text }: Props) => {
  const { fetchMoreRef, data, error, canFetchMore } = useSearchQuery(text);

  if (error) {
    return <ErrorBox />;
  }

  if (!data) {
    return (
      <List>
        {[1, 2, 3, 4, 5].map((n) => (
          <ListItemSkeleton key={n} />
        ))}
      </List>
    );
  }

  return (
    <React.Fragment>
      <List>
        {data.map((response) =>
          response.results.map((result) => (
            <SearchResultListItem key={result.id} result={result} />
          ))
        )}
      </List>
      {canFetchMore && <LoadingBox m={4} />}
      <div ref={fetchMoreRef} />
    </React.Fragment>
  );
};
