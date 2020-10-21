import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import useDeleteListForm from "./hooks/useDeleteListForm";

const useStylesDialog = makeStyles({
  paper: {
    width: "80%",
  },
});

type Props = {
  listId: string;
  onClose: () => void;
  open: boolean;
};

export default (props: Props) => {
  const { listId, onClose, open } = props;
  const classesDialog = useStylesDialog();

  const deleteListForm = useDeleteListForm({ listId });

  const handleDelete = async () => {
    try {
      await deleteListForm.submit();
    } finally {
      onClose();
    }
  };

  return (
    <Dialog classes={classesDialog} open={open} onClose={onClose}>
      <DialogTitle>Delete list?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};
