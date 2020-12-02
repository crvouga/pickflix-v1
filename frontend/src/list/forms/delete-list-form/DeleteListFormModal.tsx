import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import useModal from "../../../app/modals/useModal";
import LoadingDialog from "../../../common/components/LoadingDialog";
import { ZoomIn } from "../../../common/components/TransitionComponents";
import useBoolean from "../../../common/hooks/useBoolean";
import { useListener } from "../../../common/utility";
import { makeCurrentUserPageRoute } from "../../../user/CurrentUserPage";
import useDeleteListForm, { eventEmitterListForm } from "./useDeleteListForm";

const Loading = () => {
  const isLoading = useBoolean(false);
  useListener(eventEmitterListForm, "submit", isLoading.setTrue);
  useListener(eventEmitterListForm, "submitSettled", isLoading.setFalse);
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
  const { listId, submit } = useDeleteListForm();

  const handleSubmit = () => {
    if (listId) {
      submit({ listId });
    }
  };

  useListener(eventEmitterListForm, "submitSuccess", () => {
    close();
    history.push(makeCurrentUserPageRoute());
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
