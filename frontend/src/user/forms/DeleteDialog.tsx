import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogProps,
} from "@material-ui/core";
import React from "react";

interface Props {
  DialogProps: DialogProps;
  onDelete: () => void;
  error?: {
    message: string;
  };
}

const close = (DialogProps: DialogProps) => () => {
  if (DialogProps.onClose) {
    DialogProps.onClose({}, "backdropClick");
  }
};

export default ({ DialogProps, error, onDelete }: Props) => {
  return (
    <Dialog {...DialogProps}>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent>
        Are you sure you want to permanently delete your account?
        {error && <Box color="error.main">{error.message}</Box>}
      </DialogContent>
      <DialogActions>
        <Button onClick={close(DialogProps)}>Cancel</Button>
        <Box color="error.main">
          <Button color="inherit" onClick={onDelete}>
            Delete
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
