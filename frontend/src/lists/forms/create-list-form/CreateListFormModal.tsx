import { Dialog } from "@material-ui/core";
import React from "react";
import useModal from "../../../navigation/modals/useModal";
import { useListener } from "../../../utils";
import AddListForm from "./CreateListForm";
import useCreateListForm from "./useCreateListForm";

export default () => {
  const { isOpen, close } = useModal("CreateListForm");
  const { eventEmitter } = useCreateListForm();

  useListener(eventEmitter, "submitSuccess", close);

  return (
    <Dialog open={isOpen} onClose={close}>
      <AddListForm onCancel={close} />
    </Dialog>
  );
};
