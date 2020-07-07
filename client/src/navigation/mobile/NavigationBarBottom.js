import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    maxWidth: "100%",
  },
  toolbar: {
    ...theme.mixins.toolbar,
    bottom: 0,
  },
}));
export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const history = useHistory();
  const pathname = history.location.pathname;
  const handleChange = (event, newValue) => {
    history.push(newValue);
  };

  return (
    <React.Fragment>
      <BottomNavigation
        value={pathname}
        onChange={handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction value="/" label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction
          value="/search"
          label="Search"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          value="/account"
          label="You"
          icon={<AccountCircleIcon />}
        />
      </BottomNavigation>
      <div className={classes.toolbar} />
    </React.Fragment>
  );
}
