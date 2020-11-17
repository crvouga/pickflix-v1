import { IconButton, Toolbar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import React from "react";
import useModal from "../../navigation/modals/useModal";
import useDeleteListForm from "../forms/delete-list-form/useDeleteListForm";

export default ({ listId }: { listId: string }) => {
  const editListFormModal = useModal("EditListForm");
  const deleteListFormModal = useModal("DeleteListForm");
  const deleteListForm = useDeleteListForm();

  return (
    <Toolbar>
      <IconButton onClick={editListFormModal.open}>
        <EditIcon />
      </IconButton>

      <IconButton
        onClick={() => {
          deleteListForm.setListId(listId);
          deleteListFormModal.open();
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Toolbar>
  );
};
