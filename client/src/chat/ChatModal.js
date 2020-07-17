import {
  Box,
  ButtonBase,
  Dialog,
  Paper,
  Slide,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import modal from "../common/redux/modal";
import Input from "./Input";
import MessageList from "./MessageList";
import RefsContext from "./RefsContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  fab: {
    borderRadius: "50%",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default () => {
  const classes = useStyles();
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
        <ButtonBase onClick={handleClose} className={classes.fab}>
          <CloseIcon />
        </ButtonBase>
      </Box>
    </Dialog>
  );
};
