import React from "react";

import { search } from "./redux/search";
import { List } from "@material-ui/core";
import SearchResultListItem from "./SearchResultListItem";
import { useSelector } from "react-redux";

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
