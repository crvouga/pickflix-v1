import {
  AppBar,
  Box,
  Button,
  Dialog,
  makeStyles,
  Slide,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import modal from "../common/redux/modal";
import player from "./redux/player";
import VideoPage from "./VideoPage";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "100%",
    backgroundColor: theme.palette.background.default,
  },
  iconButton: {
    display: "block",
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
  },
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
  },
  toolbarSpace: theme.mixins.toolbar,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default () => {
  const classes = useStyles();
  const isOpen = useSelector(modal.selectors.isOpen("videoModal"));
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(player.actions.pause());
    dispatch(modal.actions.close("videoModal"));
  };
  const location = useLocation();
  useEffect(() => {
    handleClose();
  }, [location.pathname]);

  return (
    <Dialog
      TransitionComponent={Transition}
      PaperProps={{ classes: { root: classes.paper } }}
      onClose={handleClose}
      open={isOpen}
      keepMounted
      fullScreen
    >
      <VideoPage />
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar className={classes.toolbar}>
          <IconButton className={classes.iconButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
};
