import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import LoadingDialog from "../../../common/components/LoadingDialog";
import { ZoomIn } from "../../../common/components/TransitionComponents";
import useBoolean from "../../../common/hooks/useBoolean";
import useModal from "../../../navigation/modals/useModal";
import { useListener } from "../../../utils";
import useDeleteListForm from "./useDeleteListForm";

const Loading = () => {
  const { eventEmitter } = useDeleteListForm();
  const isLoading = useBoolean(false);
  useListener(eventEmitter, "submit", isLoading.setTrue);
  useListener(eventEmitter, "submitSettled", isLoading.setFalse);
  return (
    <LoadingDialog
      open={isLoading.value}
      ListItemTextProps={{ primary: "Deleting" }}
    />
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
      <Loading />
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
