import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  makeStyles,
  ButtonBase,
  Paper,
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
  const handleClose = () => {
    dispatch(modal.actions.close("chat"));
  };
  useEffect(() => {
    return history.listen(handleClose);
  }, []);

  const messageListBottomRef = useRef();
  const inputRef = useRef();
  const refs = {
    messageListBottom: messageListBottomRef,
    input: inputRef,
  };

  useEffect(() => {
    if (refs.input.current) {
      if (isOpen) {
        refs.messageListBottom.current.scrollIntoView();
        refs.input.current.focus();
      } else {
        refs.input.current.blur();
      }
    }
  }, [refs.input.current, isOpen]);

  return (
    <Dialog
      fullScreen
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <RefsContext.Provider value={refs}>
        <MessageList />
        <Input />
      </RefsContext.Provider>
      <Box position="fixed" top={0} left={0} width="100%" p={1}>
        <ButtonBase onClick={handleClose}>
          <Box component={Paper} elevation={4} p={2} borderRadius="50%">
            <CloseIcon />
          </Box>
        </ButtonBase>
      </Box>
    </Dialog>
  );
};
