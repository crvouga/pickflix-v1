import { Dialog } from "@material-ui/core";
import React from "react";
import useModal from "../../../app/modals/useModal";
import { ZoomIn } from "../../../common/components/TransitionComponents";
import { useListener } from "../../../common/utility";
import DeleteListItemForm from "./RemoveListItemForm";
import useRemoveListItemsForm from "./useRemoveListItemsForm";

export default () => {
  const { isOpen, close } = useModal("RemoveListItemsForm");
  const { eventEmitter } = useRemoveListItemsForm();

  useListener(eventEmitter, "submit", close);

  return (
    <Dialog TransitionComponent={ZoomIn} open={isOpen} onClose={close}>
      <DeleteListItemForm onCancel={close} />
    </Dialog>
  );
};
