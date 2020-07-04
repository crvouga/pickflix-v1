import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import modal from "../../common/redux/modal";
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
  const isOpen = useSelector(modal.selectors.isOpen("navigationDrawer"));
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(modal.actions.close("navigationDrawer"));
  };

  return (
    <Drawer
      variant="temporary"
      open={isOpen}
      onClose={handleClose}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <DrawerContent />
    </Drawer>
  );
};
