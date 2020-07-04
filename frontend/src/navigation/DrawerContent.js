import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import modal from "../common/redux/modal";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
    width: `calc(100% - ${drawerWidth}px)`,
  },
}));

const drawerWidth = 240;

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const unlisten = history.listen(() => {
      dispatch(modal.actions.close("navigationDrawer"));
    });
    return () => {
      unlisten();
    };
  }, []);
  const user = {};
  return (
    <List style={{ padding: 0 }}>
      {false ? (
        <ListItem
          className={classes.toolbar}
          button
          selected={location.pathname === "/profile"}
          onClick={() => {
            history.push("/profile");
          }}
        >
          <ListItemAvatar>
            <Avatar
              style={user.photoURL && { backgroundColor: "white" }}
              src={user.photoURL}
            />
          </ListItemAvatar>
          <ListItemText primary={user.displayName} secondary={user.email} />
        </ListItem>
      ) : (
        <ListItem
          className={classes.toolbar}
          button
          selected={location.pathname === "/auth"}
          onClick={() => {
            history.push("/auth");
          }}
        >
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary="Sign In" />
        </ListItem>
      )}
      <ListItem
        button
        selected={location.pathname === "/"}
        onClick={() => {
          history.push("/");
        }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </List>
  );
};
