import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import ExploreIcon from "@material-ui/icons/Explore";
import HomeIcon from "@material-ui/icons/Home";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SearchIcon from "@material-ui/icons/Search";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    maxWidth: "100%",
    zIndex: theme.zIndex.appBar,
    marginRight: theme.spacing(2),
    marginRight: theme.spacing(2),
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
        classes={{ root: classes.root }}
      >
        <BottomNavigationAction value="/" icon={<HomeIcon />} />
        <BottomNavigationAction value="/discover" icon={<ExploreIcon />} />
        <BottomNavigationAction value="/search" icon={<SearchIcon />} />
        <BottomNavigationAction value="/profile" icon={<PersonIcon />} />
      </BottomNavigation>
      <div className={classes.toolbar} />
    </React.Fragment>
  );
};
