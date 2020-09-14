import {
  Box,
  Checkbox,
  CircularProgress,
  Dialog,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default () => {
  const dispatch = useDispatch();

  // modal

  const isOpen = useSelector(selectors.modal.isOpen("EditListsDialog"));
  const modalProps = useSelector(selectors.modal.props("EditListsDialog"));

  const onClose = () => {
    dispatch(actions.modal.close("EditListsDialog"));
  };
  const onClickCreateList = () => {
    dispatch(actions.modal.close("EditListsDialog"));
    dispatch(actions.modal.open("CreateListDialog"));
  };

  // lists

  const tmdbId = modalProps.movieId;

  useEffect(() => {
    if (isOpen) {
      dispatch(actions.lists.fetch({ tmdbId }));
    }
  }, [isOpen]);

  const lists = useSelector(selectors.lists.lists);
  const status = useSelector(selectors.lists.status);
  const listItemAdditions = useSelector(selectors.lists.listItemAdditions);

  const isChecked = (listId) => {
    const foundList = lists.find(
      (list) =>
        listId === listId && list.tmdbIds && list.tmdbIds.includes(tmdbId)
    );
    const foundAddition = listItemAdditions.find(
      (listItem) => listItem.tmdbId === tmdbId && listItem.listId === listId
    );
    return Boolean(foundList || foundAddition);
  };

  const handleToggle = (listId) => () => {
    dispatch(actions.lists.toggleChange({ listId, tmdbId }));
  };

  const handleDone = () => {
    dispatch(actions.lists.submitChanges());
  };

  return (
    <Dialog
      fullScreen
      TransitionComponent={Transition}
      open={isOpen}
      onClose={onClose}
    >
      <ListItem button onClick={onClickCreateList}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Create List" />
      </ListItem>
      <List>
        {status === "error" && "error"}
        {status === "loading" && (
          <Box textAlign="center" p={4}>
            <CircularProgress />
          </Box>
        )}
        {status === "success" && (
          <React.Fragment>
            {lists.map((list) => (
              <ListItem key={list.id} button onClick={handleToggle(list.id)}>
                <ListItemIcon>
                  <Checkbox checked={isChecked(list.id)} />
                </ListItemIcon>
                <ListItemText primary={list.title} />
              </ListItem>
            ))}
          </React.Fragment>
        )}
        <Divider />
        <ListItem button onClick={handleDone}>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText primary="Done" />
        </ListItem>
      </List>
    </Dialog>
  );
};
