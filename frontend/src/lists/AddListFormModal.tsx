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
import { Alert } from "@material-ui/lab";
import React, { useEffect, useRef } from "react";
import useModal from "../navigation/modals/useModal";
import useAddListForm from "./hooks/useAddListForm";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    width: "80%",
  },
}));

export default () => {
  const classesDialog = useStylesDialog();
  const addListModal = useModal("AddList");
  const addListForm = useAddListForm();

  useEffect(() => {
    addListForm.reset();
  }, []);

  const handleClose = () => {
    addListForm.reset();
    addListModal.close();
  };

  const refTitle = useRef<HTMLInputElement>();

  const handleSubmit = async () => {
    const title = refTitle.current?.value || "";
    await addListForm.submit({ title });
    handleClose();
  };

  return (
    <Dialog
      classes={classesDialog}
      open={addListModal.isOpen}
      onClose={handleClose}
    >
      <DialogTitle>Create List</DialogTitle>
      <DialogContent>
        {addListForm.errors.map((error) => (
          <Box key={error.message} paddingY={1}>
            <Alert severity="error">{error.message}</Alert>
          </Box>
        ))}
        <Box marginBottom={2}>
          <TextField
            inputRef={refTitle}
            variant="outlined"
            name="title"
            label="Title"
            placeholder="My List"
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
