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
import { LinkButton } from "../../../app/modals/Snackbar";
import { useCreateListMutation } from "../../query";

export default () => {
  const snackbar = useSnackbar();

  const { isOpen, close } = useModal("CreateListForm");

  const [createListMutation] = useCreateListMutation();
  const submit = async ({ title }: { title: string }) => {
    try {
      return await createListMutation({ title, description: "" });
    } catch (error) {
      throw error;
    }
  };

  const refTitle = useRef<HTMLInputElement>();
  const handleSubmit = async () => {
    if (refTitle.current && refTitle.current.value.length > 0) {
      try {
        const list = await submit({ title: refTitle.current.value });
        if (list) {
          snackbar.display({
            message: `Created "${list.title}"`,
            action: <LinkButton path={`/list/${list.id}`} />,
          });
        }
        close();
      } catch (error) {}
    }
  };

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Create List</DialogTitle>
      <DialogContent>
        <Box paddingBottom={1}>
          <TextField
            variant="outlined"
            name="title"
            label="Title"
            placeholder="My List"
            fullWidth
            inputRef={refTitle}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button size="large" onClick={close}>
          Cancel
        </Button>

        <Button size="large" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
