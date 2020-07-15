import { AppBar, Dialog, IconButton, Slide, Toolbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import modal from "../common/redux/modal";
import Input from "./Input";
import MessageList from "./MessageList";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default () => {
  const history = useHistory();
  const isOpen = useSelector(modal.selectors.isOpen("chat"));
  const dispatch = useDispatch();
  const close = () => {
    dispatch(modal.actions.close("chat"));
  };
  useEffect(() => history.listen(close), []);

  return (
    <Dialog
      fullScreen
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
      <MessageList />
      <Input />
    </Dialog>
  );
};
