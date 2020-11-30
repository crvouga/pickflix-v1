import { IconButton, Toolbar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import React from "react";
import useModal from "../../app/modals/useModal";
import useDeleteListForm from "../forms/delete-list-form/useDeleteListForm";
import useEditListForm from "../forms/edit-list-form/useEditListForm";
import { List } from "../query";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

const EditListButton = ({ list }: { list: List }) => {
  const editListFormModal = useModal("EditListForm");
  const editListForm = useEditListForm();
  return (
    <IconButton
      onClick={() => {
        editListForm.setListId(list.id);
        editListForm.setDescription(list.description);
        editListForm.setTitle(list.title);
        editListFormModal.open();
      }}
    >
      <EditIcon />
    </IconButton>
  );
};

const DeleteListButton = ({ list }: { list: List }) => {
  const deleteListFormModal = useModal("DeleteListForm");
  const deleteListForm = useDeleteListForm();
  return (
    <IconButton
      onClick={() => {
        deleteListForm.setListId(list.id);
        deleteListFormModal.open();
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

const AddUserButton = () => {
  return (
    <IconButton>
      <GroupAddIcon />
    </IconButton>
  );
};

export default ({ list }: { list: List }) => {
  return (
    <Toolbar>
      <EditListButton list={list} />
      <DeleteListButton list={list} />
      <AddUserButton />
    </Toolbar>
  );
};
