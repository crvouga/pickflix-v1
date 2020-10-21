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
import React, { useEffect } from "react";
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

  const handleSubmit = async () => {
    await addListForm.submit();
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    addListForm.setTitle(e.target.value);
  };

  return (
    <Dialog
      classes={classesDialog}
      open={addListModal.isOpen}
      onClose={handleClose}
    >
      <DialogTitle>Create List</DialogTitle>
      <DialogContent>
        <Box marginBottom={2}>
          <TextField
            onChange={handleChange}
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
