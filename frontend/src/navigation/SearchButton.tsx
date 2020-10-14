import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useHistory } from "react-router";

export default () => {
  const history = useHistory();

  const onSearch = () => {
    history.push("/search");
  };

  return (
    <IconButton onClick={onSearch}>
      <SearchIcon />
    </IconButton>
  );
};
