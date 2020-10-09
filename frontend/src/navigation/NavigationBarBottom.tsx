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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import { useHistory, useLocation } from "react-router";

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
    color: theme.palette.action.active,
  },
}));

const useStylesBottomNavigationAction = makeStyles((theme) => ({
  root: {
    color: theme.palette.action.active,
  },
  wrapper: {
    color: theme.palette.action.active,
  },
  selected: {
    color: theme.palette.action.active,
  },
}));

export default () => {
  const classes = useStyles();
  const classesBottomNavigation = useStylesBottomNavigation();
  const classesBottomNavigationAction = useStylesBottomNavigationAction();

  const history = useHistory();
  const location = useLocation();

  const navigationActions: BottomNavigationActionProps[] = [
    {
      value: "/",
      icon: location.pathname === "/" ? <HomeIcon /> : <HomeOutlinedIcon />,
      label: "Home",
      onClick: () => {
        history.push("/");
      },
    },
    {
      value: "/discover",
      label: "Explore",
      icon:
        location.pathname === "/discover" ? (
          <ExploreIcon />
        ) : (
          <ExploreOutlinedIcon />
        ),
      onClick: () => {
        history.push("/discover");
      },
    },

    {
      value: "/profile",
      label: "Profile",
      icon:
        location.pathname === "/profile" ? (
          <PersonIcon />
        ) : (
          <PersonOutlinedIcon />
        ),
      onClick: () => {
        history.push("/profile");
      },
    },
  ];

  return (
    <React.Fragment>
      <BottomNavigation
        value={location.pathname}
        showLabels
        classes={classesBottomNavigation}
      >
        {navigationActions.map(({ value, label, icon, onClick }) => (
          <BottomNavigationAction
            classes={classesBottomNavigationAction}
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
