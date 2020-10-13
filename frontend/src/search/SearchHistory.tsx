import React from "react";
import { useSelector } from "../redux/types";
import { search } from "./redux/search";
import { List } from "@material-ui/core";
import SearchResultListItem from "./SearchResultListItem";

export default () => {
  const searchHistory = useSelector(search.selectors.history);

  return (
    <List>
      {searchHistory.map((result) => (
        <SearchResultListItem key={result.id} result={result} />
      ))}
    </List>
  );
};
