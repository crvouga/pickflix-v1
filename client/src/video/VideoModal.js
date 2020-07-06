import {
  AppBar,
  Button,
  Dialog,
  makeStyles,
  Slide,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import modal from "../common/redux/modal";
import player from "./redux/player";
import VideoPage from "./VideoPage";

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
    justifyContent: "space-between",
  },
  appBar: {
    backgroundColor: theme.palette.background.default,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default () => {
  const { videos = [] } = useSelector(modal.selectors.props("videoModal"));
  const isOpen = useSelector(modal.selectors.isOpen("videoModal"));
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(player.actions.pause());
    dispatch(modal.actions.close("videoModal"));
  };
  const classes = useStyles();

  return (
    <Dialog
      TransitionComponent={Transition}
      PaperProps={{ classes: { root: classes.paper } }}
      onClose={handleClose}
      open={isOpen}
      keepMounted
      fullScreen
    >
      <AppBar className={classes.appBar} elevation={0} position="sticky">
        <Toolbar variant="dense" className={classes.toolbar}>
          <Button onClick={handleClose}>Done</Button>
          {/* <IconButton className={classes.iconButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton> */}
          {/* <IconButton className={classes.iconButton}>
            <CastIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <div>
        <VideoPage videos={videos} />
      </div>
    </Dialog>
  );
};
