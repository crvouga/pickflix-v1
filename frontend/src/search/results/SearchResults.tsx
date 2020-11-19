import React from "react";
import SearchHistoryList from "../history/SearchHistoryList";
import SearchResultList from "./SearchResultList";
import { useSearchState } from "../redux/search";

export default () => {
  const { text } = useSearchState();

  return (
    <React.Fragment>
      {text.trim().length === 0 ? <SearchHistoryList /> : <SearchResultList />}
    </React.Fragment>
  );
};
