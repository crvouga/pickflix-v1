import {
  ButtonBase,
  ButtonBaseProps,
  IconButton,
  IconButtonProps,
  makeStyles,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "360px",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.spacing(0.5),
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export const SearchBox = (props: ButtonBaseProps) => {
  const classes = useStyles();
  return (
    <ButtonBase className={classes.root} {...props}>
      <SearchIcon className={classes.icon} />
      <Typography>Search Pickflix</Typography>
    </ButtonBase>
  );
};

export const SearchButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props}>
      <SearchIcon />
    </IconButton>
  );
};
