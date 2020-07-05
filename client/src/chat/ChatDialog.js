import {
  AppBar,
  Dialog,
  IconButton,
  makeStyles,
  Paper,
  Slide,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect } from "react";

import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  dialog: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { isOpen = false, close = () => {} } = {};
  useEffect(() => history.listen(close), []);

  return (
    <Dialog
      classes={{
        root: classes.dialog,
      }}
      fullScreen={fullScreen}
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={close}
      id="draggable-dialog-title"
    >
      <AppBar
        style={{ cursor: "move" }}
        id="draggable-dialog-title"
        color="default"
        position="sticky"
      >
        <Toolbar>
          <IconButton edge="start" onClick={close}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ChatMessageList />
      <ChatInput />
    </Dialog>
  );
};
