import {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigationActionProps,
} from "@material-ui/core";
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
  toolbar: {
    ...theme.mixins.toolbar,
    bottom: 0,
  },
}));

const useStylesBottomNavigation = makeStyles((theme) => ({
  root: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    maxWidth: "100%",
    zIndex: theme.zIndex.appBar,
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
  },
}));

export default () => {
  const classes = useStyles();
  const classesBottomNavigation = useStylesBottomNavigation();
  const dispatch = useDispatch();
  const pathname = useSelector(selectors.router.pathname);

  const navigationActions: BottomNavigationActionProps[] = [
    {
      value: "/",
      icon: pathname === "/" ? <HomeIcon /> : <HomeOutlinedIcon />,
      label: "Home",
      onClick: () => dispatch(actions.router.push({ pathname: "/" })),
    },
    {
      value: "/discover",
      label: "Explore",
      icon:
        pathname === "/discover" ? <ExploreIcon /> : <ExploreOutlinedIcon />,
      onClick: () => dispatch(actions.router.push({ pathname: "/discover" })),
    },
    // {
    //   value: "/search",
    //   label: "Search",
    //   icon: <SearchIcon />,
    //   onClick: () => {
    //     dispatch(actions.router.push({ pathname: "/search" }));
    //   },
    // },
    {
      value: "/profile",
      label: "Profile",
      icon: pathname === "/profile" ? <PersonIcon /> : <PersonOutlinedIcon />,
      onClick: () => dispatch(actions.router.push({ pathname: "/profile" })),
    },
  ];

  return (
    <React.Fragment>
      <BottomNavigation
        value={pathname}
        showLabels
        classes={classesBottomNavigation}
      >
        {navigationActions.map(({ value, label, icon, onClick }) => (
          <BottomNavigationAction
            key={value}
            value={value}
            label={label}
            icon={icon}
            onClick={onClick}
          />
        ))}
      </BottomNavigation>
      <div className={classes.toolbar} />
    </React.Fragment>
  );
};
