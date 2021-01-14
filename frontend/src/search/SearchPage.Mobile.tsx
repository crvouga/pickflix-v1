import React from "react";
import Page from "../common/page/Page";
import SearchBar from "./input/SearchBar";
import SearchResults from "./results/SearchResults";

export default () => {
  return (
    <Page>
      <SearchBar />
      <SearchResults />
    </Page>
  );
};
