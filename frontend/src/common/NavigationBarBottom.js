import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import ExploreIcon from "@material-ui/icons/Explore";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";

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
  const pathname = useSelector(selectors.router.pathname);

  const navigationActions = [
    {
      value: "/",
      icon: pathname === "/" ? <HomeIcon /> : <HomeOutlinedIcon />,
      label: "Home",
      onClick: () => dispatch(actions.router.push("/")),
    },
    {
      value: "/discover",
      label: "Explore",
      icon:
        pathname === "/discover" ? <ExploreIcon /> : <ExploreOutlinedIcon />,
      onClick: () => dispatch(actions.router.push("/discover")),
    },
    {
      value: "/search",
      label: "Search",
      icon: <SearchIcon />,
      onClick: () => dispatch(actions.router.push("/search")),
    },
    {
      value: "/profile",
      label: "Profile",
      icon: pathname === "/profile" ? <PersonIcon /> : <PersonOutlinedIcon />,
      onClick: () => dispatch(actions.router.push("/profile")),
    },
  ];

  return (
    <React.Fragment>
      <BottomNavigation
        value={pathname}
        showLabels
        classes={{ root: classes.root }}
      >
        {navigationActions.map((props) => (
          <BottomNavigationAction {...props} />
        ))}
      </BottomNavigation>
      <div className={classes.toolbar} />
    </React.Fragment>
  );
};
