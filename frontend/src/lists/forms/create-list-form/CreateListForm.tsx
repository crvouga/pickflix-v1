import { Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";

import useSnackbar from "../../../snackbar/useSnackbar";
import useCreateListForm from "./useCreateListForm";
import { useListener } from "../../../utils";
import { ViewListButton } from "../../../snackbar/Snackbar";

export default ({ onCancel }: { onCancel?: () => void }) => {
  const snackbar = useSnackbar();
  const createListForm = useCreateListForm();

  const handleSubmit = () => {
    createListForm.submit();
  };

  useListener(createListForm.eventEmitter, "submitSuccess", (list) => {
    snackbar.display({
      message: `Created "${list.title}"`,
      action: <ViewListButton listId={list.id} />,
    });
  });

  return (
    <React.Fragment>
      <Box p={2}>
        <Typography variant="h6">Create List</Typography>
      </Box>
      <Box paddingX={2} paddingBottom={1}>
        <Box>
          <TextField
            variant="outlined"
            name="title"
            label="Title"
            placeholder="My List"
            fullWidth
            onChange={(event) => {
              createListForm.setTitle(event.target.value || "");
            }}
          />
        </Box>
      </Box>
      <Box
        paddingX={2}
        paddingBottom={1}
        display="flex"
        flexDirection="row-reverse"
      >
        <Button color="primary" onClick={handleSubmit}>
          Create
        </Button>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
      </Box>
    </React.Fragment>
  );
};
