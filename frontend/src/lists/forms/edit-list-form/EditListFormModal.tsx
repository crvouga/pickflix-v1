import React from "react";
import ResponsiveDialog from "../../../common/components/ResponsiveDialog";
import useModal from "../../../navigation/modals/useModal";
import EditListForm from "./EditListForm";
import useEditListForm from "./useEditListForm";
import { useListener } from "../../../utils";
import { Dialog } from "@material-ui/core";

export default () => {
  const { isOpen, close } = useModal("EditListForm");
  const { eventEmitter } = useEditListForm();

  useListener(eventEmitter, "submitSuccess", () => {
    close();
  });

  return (
    <Dialog open={isOpen} onClose={close}>
      <EditListForm onCancel={close} />
    </Dialog>
  );
};
