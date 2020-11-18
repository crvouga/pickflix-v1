import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { ZoomIn } from "../../../common/components/TransitionComponents";
import useBoolean from "../../../common/hooks/useBoolean";
import useModal from "../../../navigation/modals/useModal";
import { useListener } from "../../../utils";
import useDeleteListForm from "./useDeleteListForm";

const LoadingDialog = () => {
  const { eventEmitter } = useDeleteListForm();
  const isLoading = useBoolean(false);
  useListener(eventEmitter, "submit", isLoading.setTrue);
  useListener(eventEmitter, "submitSettled", isLoading.setFalse);
  return (
    <Dialog open={isLoading.value}>
      <List>
        <ListItem>
          <ListItemIcon>
            <CircularProgress disableShrink />
          </ListItemIcon>
          <ListItemText primary="Deleting" />
        </ListItem>
      </List>
    </Dialog>
  );
};
export default () => {
  const history = useHistory();
  const { isOpen, close } = useModal("DeleteListForm");
  const { listId, submit, eventEmitter } = useDeleteListForm();

  const handleSubmit = () => {
    if (listId) {
      submit({ listId });
    }
  };

  useListener(eventEmitter, "submitSuccess", () => {
    close();
    history.push("/user");
  });

  return (
    <Dialog TransitionComponent={ZoomIn} open={isOpen} onClose={close}>
      <LoadingDialog />
      <DialogTitle>Delete list?</DialogTitle>
      <DialogActions>
        <Button size="large" onClick={close}>
          Cancel
        </Button>
        <Button size="large" onClick={handleSubmit}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
