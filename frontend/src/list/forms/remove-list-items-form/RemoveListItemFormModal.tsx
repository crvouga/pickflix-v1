import { Dialog } from "@material-ui/core";
import React from "react";
import { ZoomIn } from "../../../common/components/TransitionComponents";
import useModal from "../../../app/modals/useModal";
import { useListener } from "../../../common/utility";
import DeleteListItemForm from "./RemoveListItemForm";
import useRemoveListItemsForm from "./useRemoveListItemsForm";

export default () => {
  const deleteListItemsFormModal = useModal("DeleteListItemsForm");

  const { eventEmitter } = useRemoveListItemsForm();

  useListener(eventEmitter, "submit", deleteListItemsFormModal.close);

  return (
    <Dialog
      TransitionComponent={ZoomIn}
      open={deleteListItemsFormModal.isOpen}
      onClose={deleteListItemsFormModal.close}
    >
      <DeleteListItemForm onCancel={deleteListItemsFormModal.close} />
    </Dialog>
  );
};
