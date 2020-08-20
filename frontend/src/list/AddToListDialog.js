import {
  Box,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default () => {
  const isOpen = useSelector(selectors.modal.isOpen("AddToListDialog"));
  const lists = useSelector(selectors.list.lists);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(actions.modal.close("AddToListDialog"));
  };
  const onClickCreateList = () => {
    dispatch(actions.modal.open("CreateListDialog"));
  };
  return (
    <Dialog
      fullScreen
      TransitionComponent={Transition}
      open={isOpen}
      onClose={onClose}
    >
      <List>
        <ListItem button onClick={onClickCreateList}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Create List" />
        </ListItem>
        {lists.map((list) => (
          <ListItem key={list.id}>
            <ListItemText primary={list.name} secondary={list.items.length} />
          </ListItem>
        ))}
      </List>
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
