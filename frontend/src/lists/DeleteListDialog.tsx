import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStylesDialog = makeStyles({
  paper: {
    width: "80%",
  },
});

type Props = {
  onDelete: () => void;
  onClose: () => void;
  open: boolean;
};

export default (props: Props) => {
  const { onDelete, onClose, open } = props;
  const classesDialog = useStylesDialog();

  return (
    <Dialog classes={classesDialog} open={open} onClose={onClose}>
      <DialogTitle>Delete list?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};
