import React from "react";
import useModal from "../../../app/modals/useModal";
import NonFullscreenResponsiveDialog from "../../../common/components/NonFullscreenResponsiveDialog";
import { useListener } from "../../../common/utility";
import EditUserForm from "./EditUserForm";
import useEditUserForm from "./useEditUserForm";

export default () => {
  const { isOpen, close } = useModal("EditUserForm");
  const { eventEmitter } = useEditUserForm();
  useListener(eventEmitter, "submitSuccess", close);

  return (
    <NonFullscreenResponsiveDialog open={isOpen} onClose={close}>
      <EditUserForm onCancel={close} />
    </NonFullscreenResponsiveDialog>
  );
};
