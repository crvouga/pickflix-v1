import React from "react";
import useModal from "../../../app/modals/useModal";
import NonFullscreenResponsiveDialog from "../../../common/components/NonFullscreenResponsiveDialog";
import EditUserForm from "./EditUserForm";

export default () => {
  const { isOpen, close } = useModal("EditUserForm");

  return (
    <NonFullscreenResponsiveDialog open={isOpen} onClose={close}>
      <EditUserForm onCancel={close} />
    </NonFullscreenResponsiveDialog>
  );
};
