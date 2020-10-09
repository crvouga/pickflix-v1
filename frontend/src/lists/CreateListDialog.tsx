import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";
import { ModalName } from "../redux/router/types";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    width: "80%",
  },
}));

export default () => {
  const classesDialog = useStylesDialog();

  const dispatch = useDispatch();

  const onClose = () => {};

  const inputRefTitle = useRef<HTMLInputElement>();

  const onClickCreate = async () => {
    const listInfo = {
      title: inputRefTitle.current?.value || "",
      listItemInfos: [],
    };
    dispatch(actions.lists.addList(listInfo));
  };

  return (
    <Dialog classes={classesDialog} open={false} onClose={onClose}>
      <DialogTitle>Create List</DialogTitle>
      <DialogContent>
        <Box marginBottom={2}>
          <TextField
            autoFocus
            inputRef={inputRefTitle}
            variant="outlined"
            name="title"
            label="Title"
            placeholder="My List"
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={onClickCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
