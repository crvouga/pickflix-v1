import React, { useState } from "react";
import { useHistory } from "react-router";
import { DiscoverMovieTag } from "../query/types";
import useDiscoverLogic from "../useDiscoverLogic";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

export default () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const discoverLogic = useDiscoverLogic();

  const handleClick = (tag: DiscoverMovieTag) => {
    discoverLogic.activateTag(tag);
    history.push("/discover");
  };

  return (
    <React.Fragment>
      <SearchBar onChange={setSearchQuery} />
      <SearchResults onClick={handleClick} searchQuery={searchQuery} />
    </React.Fragment>
  );
};
