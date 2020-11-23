import { Dialog } from "@material-ui/core";
import React from "react";
import { ZoomIn } from "../../../common/components/TransitionComponents";
import { useListener } from "../../../common/utility";
import DeleteListItemForm from "./RemoveListItemForm";
import useRemoveListItemsForm from "./useRemoveListItemsForm";

export default () => {
  const {
    eventEmitter,
    isModalOpen,
    setIsModalOpen,
  } = useRemoveListItemsForm();

  const onClose = () => setIsModalOpen(false);

  useListener(eventEmitter, "submit", onClose);

  return (
    <Dialog TransitionComponent={ZoomIn} open={isModalOpen} onClose={onClose}>
      <DeleteListItemForm onCancel={onClose} />
    </Dialog>
  );
};
