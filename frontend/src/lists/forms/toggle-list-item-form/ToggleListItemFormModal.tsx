import React from "react";
import ResponsiveDialog from "../../../common/components/ResponsiveDialog";
import { SlideUp } from "../../../common/components/TransitionComponents";
import useModal from "../../../navigation/modals/useModal";
import ToggleListItemForm from "./ToggleListItemForm";

export default () => {
  const { isOpen, close } = useModal("ToggleListItemForm");

  return (
    <ResponsiveDialog
      TransitionComponent={SlideUp}
      open={isOpen}
      onClose={close}
    >
      <ToggleListItemForm onCancel={close} />
    </ResponsiveDialog>
  );
};
