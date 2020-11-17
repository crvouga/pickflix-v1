import { Dialog } from "@material-ui/core";
import React from "react";
import { ZoomIn } from "../../../common/components/TransitionComponents";
import useModal from "../../../navigation/modals/useModal";
import DeleteListForm from "./DeleteListForm";

export default () => {
  const { isOpen, close } = useModal("DeleteListForm");

  return (
    <Dialog TransitionComponent={ZoomIn} open={isOpen} onClose={close}>
      <DeleteListForm onCancel={close} />
    </Dialog>
  );
};
