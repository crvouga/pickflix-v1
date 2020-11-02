import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React from "react";

type Props = DialogProps & {
  onClear: () => void;
};
const close = (DialogProps: DialogProps) => () => {
  if (DialogProps.onClose) {
    DialogProps.onClose({}, "backdropClick");
  }
};

export default ({ onClear, ...DialogProps }: Props) => {
  return (
    <Dialog {...DialogProps}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to clear history?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close(DialogProps)}>Cancel</Button>
        <Box color="error.main">
          <Button color="inherit" onClick={onClear}>
            <DeleteForeverIcon /> Clear
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
