import { Box, Dialog, IconButton, Slide, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default () => {
  const isOpen = useSelector(selectors.modal.isOpen("CreateListDialog"));
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(actions.modal.close("CreateListDialog"));
  };
  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <TextField placeholder="list name" fullWidth />
      <Box
        display="flex"
        justifyContent="center"
        position="fixed"
        top="auto"
        left={0}
        bottom={0}
        width="100%"
      >
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Dialog>
  );
};
