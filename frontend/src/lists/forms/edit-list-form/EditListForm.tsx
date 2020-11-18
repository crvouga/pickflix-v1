import {
  AppBar,
  Box,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import React, { useRef, useEffect } from "react";
import useEditListForm from "./useEditListForm";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

export default ({ onCancel }: { onCancel: () => void }) => {
  const editListForm = useEditListForm();

  const refTitle = useRef<HTMLInputElement>();
  const refDescription = useRef<HTMLInputElement>();

  useEffect(() => {
    if (refTitle.current) {
      refTitle.current.value = editListForm.title || "";
    }
    if (refDescription.current) {
      refDescription.current.value = editListForm.description || "";
    }
  }, [refTitle.current, refDescription.current]);

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

  const CancelButton = () => {
    return (
      <Button
        size="large"
        // startIcon={<CloseOutlinedIcon />}
      >
        Cancel
      </Button>
    );
  };

  const SubmitButton = () => {
    return (
      <Button
        onClick={handleSubmit}
        size="large"
        style={{ color: "white" }}
        // startIcon={<ArrowUpwardIcon />}
      >
        Submit
      </Button>
    );
  };

  return (
    <React.Fragment>
      <DialogTitle>Edit List</DialogTitle>
      <DialogContent>
        <Box marginBottom={2}>
          <TextField
            variant="outlined"
            name="title"
            label="Title"
            placeholder="My List"
            fullWidth
            inputRef={refTitle}
          />
        </Box>
        <TextField
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
    </React.Fragment>
  );
};
