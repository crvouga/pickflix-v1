import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import useModal from "../../../app/modals/useModal";
import LoadingDialog from "../../../common/components/LoadingDialog";
import { ZoomIn } from "../../../common/components/TransitionComponents";
import useBoolean from "../../../common/hooks/useBoolean";
import { createEventEmitter, useListener } from "../../../common/utility";
import { makeCurrentUserPageRoute } from "../../../user/CurrentUserPage";
import { useDeleteListMutation } from "../../query";

export const eventEmitterDeleteListForm = createEventEmitter<{
  submit: undefined;
  submitSuccess: undefined;
  submitError: undefined;
  submitSettled: undefined;
}>();

const Loading = () => {
  const isLoading = useBoolean(false);
  useListener(eventEmitterDeleteListForm, "submit", isLoading.setTrue);
  useListener(eventEmitterDeleteListForm, "submitSettled", isLoading.setFalse);
  return (
    <LoadingDialog
      open={isLoading.value}
      ListItemTextProps={{ primary: "Deleting" }}
    />
  );
};

export default ({ userId, listId }: { userId: string; listId: string }) => {
  const history = useHistory();
  const { isOpen, close } = useModal("DeleteListForm");
  const mutate = useDeleteListMutation();

  const submit = async () => {
    eventEmitterDeleteListForm.emit("submit");
    try {
      await mutate({ userId, listId });
      eventEmitterDeleteListForm.emit("submitSuccess");
    } catch (error) {
      eventEmitterDeleteListForm.emit("submitError");
      throw error;
    } finally {
      eventEmitterDeleteListForm.emit("submitSettled");
    }
  };

  useListener(eventEmitterDeleteListForm, "submitSuccess", () => {
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
        <Button size="large" onClick={submit}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
