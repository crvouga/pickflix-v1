import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

export default ({ DialogProps, error, onDeleteAccount }) => {
  return (
    <Dialog {...DialogProps}>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent>
        Are you sure you want to permanently delete your account?
        {error && <Box color="error.main">{error.message}</Box>}
      </DialogContent>
      <DialogActions>
        <Button onClick={DialogProps.onClose}>Cancel</Button>
        <Box color="error.main">
          <Button color="inherit" onClick={onDeleteAccount}>
            Delete
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
