import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useDispatch } from "react-redux";
import CurrentUserAvatar from "../auth/CurrentUserAvatar";
import { actions } from "../redux";
import PickflixLogo from "../common/PickflixLogo";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSearch = () => {
    history.push("/search");
  };

  const onAccount = () => {
    history.push("/account");
  };

  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        <PickflixLogo />
        <IconButton onClick={onSearch}>
          <SearchIcon />
        </IconButton>
        <IconButton edge="end" onClick={onAccount}>
          <CurrentUserAvatar className={classes.small} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
