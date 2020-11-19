import React from "react";
import NavigationMobile from "../navigation/Navigation.Mobile";
import SearchBar from "./input/SearchBar";
import SearchResults from "./results/SearchResults";

export default () => {
  return (
    <React.Fragment>
      <SearchBar />
      <SearchResults />
      <NavigationMobile />
    </React.Fragment>
  );
};
