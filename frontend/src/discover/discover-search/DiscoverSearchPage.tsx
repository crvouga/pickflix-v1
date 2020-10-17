import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { DiscoverMovieTag } from "../discover-movie-tags";
import { discoverParams } from "../redux/discover-params";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

export default () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = (tag: DiscoverMovieTag) => {
    dispatch(discoverParams.actions.setActiveTags([tag]));
    history.push("/discover");
  };

  return (
    <React.Fragment>
      <SearchBar onChange={setSearchQuery} />
      <SearchResults onClick={handleClick} searchQuery={searchQuery} />
    </React.Fragment>
  );
};
