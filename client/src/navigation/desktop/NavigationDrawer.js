import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import DrawerContent from "../DrawerContent";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.default,
  },
}));

const drawerWidth = 240;

export default () => {
  const classes = useStyles();
  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="permanent"
      open
    >
      <DrawerContent />
    </Drawer>
  );
};
