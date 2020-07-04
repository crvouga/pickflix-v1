import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import modal from "../../common/redux/modal";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
  toolbar: theme.mixins.toolbar,
}));

export default ({ title, ...props }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleArrowBackClick = () => {
    history.goBack();
  };
  const handleMenuClick = () => {
    dispatch(modal.actions.open("navigationDrawer"));
  };
  const handleSearchClick = () => {
    dispatch(modal.actions.open("searchDialog"));
  };

  return (
    <AppBar position="sticky" id="app-bar" color="default" {...props}>
      <Toolbar variant="dense" style={{ width: "100%" }}>
        <IconButton edge="start" onClick={handleArrowBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <IconButton className={classes.menuButton} onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography align="left" noWrap style={{ flex: 1, fontWeight: "bold" }}>
          {title}
        </Typography>
        <IconButton onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
