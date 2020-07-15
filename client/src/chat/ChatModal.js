import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import BlurBackdrop from "../common/components/BlurBackdrop";
import modal from "../common/redux/modal";
import Input from "./Input";
import MessageList from "./MessageList";
import RefsContext from "./RefsContext";

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

  const messageListBottomRef = useRef();
  const messageListRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current, isOpen]);

  const refs = {
    messageListBottom: messageListBottomRef,
    messageList: messageListRef,
    input: inputRef,
  };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={close}
    >
      <AppBar position="fixed" color="transparent">
        <Box position="relative">
          <BlurBackdrop />
          <Toolbar>
            <IconButton edge="start" onClick={close}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </Box>
      </AppBar>
      <RefsContext.Provider value={refs}>
        <MessageList />
        <Input />
      </RefsContext.Provider>
    </Dialog>
  );
};
