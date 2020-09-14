import * as R from "ramda";
import {
  Divider,
  Typography,
  Box,
  Checkbox,
  CircularProgress,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import backendAPI from "../backendAPI";
import { actions, selectors } from "../redux";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default () => {
  const isOpen = useSelector(selectors.modal.isOpen("AddToListDialog"));
  const { movieId } = useSelector(selectors.modal.props("AddToListDialog"));

  const query = useQuery(["lists"], () =>
    backendAPI
      .get(`/api/lists?`, { params: { tmdbIds: [movieId] } })
      .then((res) => res.data)
  );

  const [before, setBefore] = React.useState({});

  const [checked, setChecked] = React.useState({});
  const isChecked = (list) => R.has(list.id, checked);
  const onClickToggleChecked = (list) => () => {
    setChecked(
      R.ifElse(R.has(list.id), R.dissoc(list.id), R.assoc(list.id, list))
    );
  };

  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(actions.modal.close("AddToListDialog"));
  };

  const onClickCreateList = () => {
    dispatch(actions.modal.close("AddToListDialog"));
    dispatch(actions.modal.open("CreateListDialog"));
  };

  const onClickDone = async () => {
    const previousLists = query.data || [];
    const newLists = previousLists.map((list) => {});
    const additions = [];
    const deletions = [];
    await Promise.all([
      backendAPI.post("/api/list-items", additions),
      backendAPI.delete("/api/list-items", deletions),
    ]);
  };

  const lists = query.data || [];

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
        {query.status === "error" && "error"}
        {query.status === "loading" && <CircularProgress />}
        {query.status === "success" && (
          <React.Fragment>
            {lists.map((list) => (
              <ListItem
                key={list.id}
                button
                onClick={onClickToggleChecked(list)}
              >
                <ListItemIcon>
                  <Checkbox checked={isChecked(list)} />
                </ListItemIcon>
                <ListItemText primary={list.title} />
              </ListItem>
            ))}
          </React.Fragment>
        )}
        <Divider />
        <ListItem button onClick={onClickDone}>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText primary="Done" />
        </ListItem>
      </List>
    </Dialog>
  );
};
