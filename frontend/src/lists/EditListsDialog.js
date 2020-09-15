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
import backendAPI from "../backendAPI";

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

  const tmdbMediaId = modalProps.movieId;

  useEffect(() => {
    if (isOpen) {
      dispatch(actions.lists.fetch({ tmdbMediaId }));
    }
  }, [isOpen]);

  const lists = useSelector(selectors.lists.lists);
  const status = useSelector(selectors.lists.status);

  const handleToggle = (listId) => async () => {
    try {
      const res = await backendAPI.post(`/api/lists/${listId}/list-items`, {
        tmdbMediaType: "movie",
        tmdbMediaId,
      });
      dispatch(
        actions.snackbar.enqueueSnackbar({
          message: res.data.message,
          options: { variant: "info" },
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDone = () => {
    dispatch(actions.modal.close("EditListsDialog"));
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
                {/* <ListItemIcon>
                  <Checkbox checked={isChecked(list.id)} />
                </ListItemIcon> */}
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
