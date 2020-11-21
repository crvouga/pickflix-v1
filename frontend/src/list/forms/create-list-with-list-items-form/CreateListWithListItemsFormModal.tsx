import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  TextField,
} from "@material-ui/core";
import React, { useRef } from "react";
import { MovieCardHeaderContainer } from "../../../movie/components/MovieCardHeader";
import useModal from "../../../app/modals/useModal";
import { useSnackbar } from "../../../app/modals/redux/snackbar";
import { LinkButton } from "../../../app/modals/Snackbar";
import { useListener } from "../../../common/utility";
import useCreateListWithListItemsForm from "./useCreateListWithListItemsForm";

export default () => {
  const { isOpen, close } = useModal("CreateListWithListItemsForm");

  const {
    eventEmitter,
    mediaIds,
    setMediaIds,
    submit,
  } = useCreateListWithListItemsForm();

  const refTitle = useRef<HTMLInputElement>();

  const handleSubmit = () => {
    if (refTitle.current && refTitle.current.value.length > 0) {
      submit({ title: refTitle.current.value, mediaIds });
    }
  };

  const handleClose = () => {
    setMediaIds([]);
    close();
  };

  const snackbar = useSnackbar();
  useListener(eventEmitter, "submitSuccess", (list) => {
    snackbar.display({
      message: `Created "${list.title}"`,
      action: <LinkButton path={`/list/${list.id}`} />,
    });
    handleClose();
  });

  useListener(eventEmitter, "submitSettled", () => {
    setMediaIds([]);
  });

  return (
    <Dialog open={isOpen} onClose={handleClose}>
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
        <List>
          {mediaIds.map((mediaId) => (
            <MovieCardHeaderContainer
              key={mediaId.tmdbMediaId}
              mediaId={mediaId}
            />
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button size="large" onClick={handleClose}>
          Cancel
        </Button>

        <Button size="large" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
