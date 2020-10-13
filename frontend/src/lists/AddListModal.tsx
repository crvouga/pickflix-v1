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
import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import useModal from "../navigation/modals/useModal";
import { addListMutation } from "./query";
import { snackbar } from "../snackbar/redux/snackbar";
import { ViewListButton } from "../snackbar/Snackbar";
import { useSelector } from "../redux/react-redux";
import { addListItemsForm } from "./redux/add-list-items-form";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    width: "80%",
  },
}));

export default () => {
  const classesDialog = useStylesDialog();
  const addListModal = useModal("AddList");
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(addListItemsForm.actions.reset());
    addListModal.close();
  };

  const inputRefTitle = useRef<HTMLInputElement>();
  const listItemInfos = useSelector(addListItemsForm.selectors.listItemInfos);

  const onSubmit = async () => {
    try {
      const list = await addListMutation({
        title: inputRefTitle.current?.value || "",
        description: "",
        listItemInfos,
      });
      dispatch(
        snackbar.actions.display({
          message: `Created "${list.title}"`,
          action: <ViewListButton listId={list.id} />,
        })
      );
    } catch (error) {
      dispatch(
        snackbar.actions.display({
          message: `Failed to create list`,
        })
      );
    } finally {
      dispatch(addListItemsForm.actions.reset());
      addListModal.close();
    }
  };

  const focus = () => {
    if (inputRefTitle.current) {
      inputRefTitle.current.focus();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(focus, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Dialog
      classes={classesDialog}
      open={addListModal.isOpen}
      onClose={onClose}
    >
      <DialogTitle>Create List</DialogTitle>
      <DialogContent>
        <Box marginBottom={2}>
          <TextField
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
        <Button color="primary" onClick={onSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
