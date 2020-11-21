import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useRef } from "react";
import useModal from "../../../app/modals/useModal";
import { useSnackbar } from "../../../app/modals/redux/snackbar";
import { useListener } from "../../../common/utility";
import useEditListForm from "./useEditListForm";

export default () => {
  const { isOpen, close } = useModal("EditListForm");
  const editListForm = useEditListForm();
  const { eventEmitter } = editListForm;
  const snackbar = useSnackbar();
  const refTitle = useRef<HTMLInputElement>();
  const refDescription = useRef<HTMLInputElement>();

  const handleSubmit = () => {
    const { listId } = editListForm;

    const title = refTitle.current?.value || "";
    const description = refDescription.current?.value || "";

    if (listId) {
      editListForm.submit({
        listId,
        title,
        description,
      });
    }
  };

  useListener(eventEmitter, "submitSuccess", () => {
    close();
    snackbar.display({
      message: "Saved changes",
    });
  });

  const CancelButton = () => {
    return (
      <Button onClick={close} size="large">
        Cancel
      </Button>
    );
  };

  const SubmitButton = () => {
    return (
      <Button onClick={handleSubmit} size="large" style={{ color: "white" }}>
        Submit
      </Button>
    );
  };

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Edit List</DialogTitle>
      <DialogContent>
        <Box marginBottom={2}>
          <TextField
            defaultValue={editListForm.title}
            variant="outlined"
            name="title"
            label="Title"
            placeholder="My List"
            fullWidth
            inputRef={refTitle}
          />
        </Box>
        <TextField
          defaultValue={editListForm.description}
          rowsMax={4}
          variant="outlined"
          name="description"
          label="Description"
          fullWidth
          multiline
          inputRef={refDescription}
        />
      </DialogContent>
      <DialogActions>
        <CancelButton />
        <SubmitButton />
      </DialogActions>
    </Dialog>
  );
};
