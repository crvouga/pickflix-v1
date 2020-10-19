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
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../navigation/modals/useModal";
import { snackbar } from "../snackbar/redux/snackbar";
import { ViewListButton } from "../snackbar/Snackbar";
import { addListItemMutation, addListMutation } from "./query";
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
      });

      dispatch(
        snackbar.actions.display({
          message: `Created "${list.title}"`,
          action: <ViewListButton listId={list.id} />,
        })
      );

      if (listItemInfos.length > 0) {
        const listItem = await addListItemMutation({
          ...listItemInfos[0],
          listId: list.id,
        });
      }
    } catch (error) {
      dispatch(
        snackbar.actions.display({
          message: `something went wrong`,
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
    dispatch(addListItemsForm.actions.reset());
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
