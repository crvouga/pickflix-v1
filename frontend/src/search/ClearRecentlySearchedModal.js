import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React from "react";

export default ({ DialogProps, onClear }) => {
  return (
    <Dialog {...DialogProps}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to clear search history?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={DialogProps.onClose}>Cancel</Button>
        <Box color="error.main">
          <Button color="inherit" onClick={onClear}>
            <DeleteForeverIcon /> Clear
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
