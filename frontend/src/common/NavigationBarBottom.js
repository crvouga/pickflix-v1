import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ExploreIcon from "@material-ui/icons/Explore";
import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    maxWidth: "100%",
    zIndex: theme.zIndex.appBar,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    bottom: 0,
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pathname = useSelector((state) => state.router.location.pathname);
  const handleChange = (event, newValue) => {
    dispatch(push(newValue));
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
          value="/discover"
          label="Discover"
          icon={<ExploreIcon />}
        />
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
};
