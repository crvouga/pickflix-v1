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
import useModal from "../../../app/modals/useModal";
import { useSnackbar } from "../../../app/snackbar/redux/snackbar";
import { LinkButton } from "../../../app/snackbar/Snackbar";
import LoadingDialog from "../../../common/components/LoadingDialog";
import useBoolean from "../../../common/hooks/useBoolean";
import { useListener } from "../../../common/utility";
import { MovieCardHeaderContainer } from "../../../movie/components/MovieCardHeader";
import useCreateListWithListItemsForm from "./useCreateListWithListItemsForm";

const Creating = () => {
  const { eventEmitter } = useCreateListWithListItemsForm();
  const isLoading = useBoolean(false);
  useListener(eventEmitter, "submit", isLoading.setTrue);
  useListener(eventEmitter, "submitSettled", isLoading.setFalse);
  return (
    <LoadingDialog
      open={isLoading.value}
      ListItemTextProps={{ primary: "Creating" }}
    />
  );
};

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
    <React.Fragment>
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
      <Creating />
    </React.Fragment>
  );
};
