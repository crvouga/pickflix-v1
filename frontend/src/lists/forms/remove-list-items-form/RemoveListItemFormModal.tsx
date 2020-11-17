import { Dialog } from "@material-ui/core";
import React from "react";
import { ZoomIn } from "../../../common/components/TransitionComponents";
import useModal from "../../../navigation/modals/useModal";
import { useListener } from "../../../utils";
import DeleteListItemForm from "./RemoveListItemForm";
import useRemoveListItemsForm from "./useRemoveListItemsForm";

export default () => {
  const deleteListItemsFormModal = useModal("DeleteListItemsForm");

  const { eventEmitter } = useRemoveListItemsForm();

  useListener(eventEmitter, "submitSuccess", deleteListItemsFormModal.close);

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
