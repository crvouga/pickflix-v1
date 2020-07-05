import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

const useStyles = makeStyles((theme) => ({}));

export default (props) => {
  return (
    <IconButton edge="start">
      <SearchIcon />
    </IconButton>
  );
};
