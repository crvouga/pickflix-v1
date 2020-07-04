import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import NavigationDrawer from "./NavigationDrawer";
import useModal from "../../modal/useModal";

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      left: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default ({ title, ...props }) => {
  const classes = useStyles();

  const navigationDrawer = useModal("navigationDrawer");

  return (
    <React.Fragment>
      <NavigationDrawer />
      <AppBar
        color="default"
        className={classes.appBar}
        id="app-bar"
        {...props}
      >
        <Toolbar variant="dense" style={{ width: "100%" }}>
          <IconButton
            color="inherit"
            edge="start"
            className={classes.menuButton}
            onClick={navigationDrawer.open}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flex: 1 }}>
            {title}
          </Typography>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
