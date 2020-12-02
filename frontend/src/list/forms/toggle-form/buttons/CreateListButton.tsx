import { Box, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import useModal from "../../../../app/modals/useModal";
import { useCreateListWithListItemsForm } from "../../create-list-with-list-items-form/create-list-with-list-items-form";
import { useToggleFormState } from "../toggle-form";

export const CreateListButton = () => {
  const { open } = useModal("CreateListWithListItemsForm");
  const toggleFormModal = useModal("ToggleForm");
  const { setMediaIds } = useCreateListWithListItemsForm();
  const { mediaId } = useToggleFormState();

  const handleClick = () => {
    if (mediaId) {
      setMediaIds([mediaId]);
    }
    open();
    toggleFormModal.close();
  };

  return (
    <ListItem button onClick={handleClick}>
      <ListItemIcon color="inherit">
        <Box color="primary.main">
          <AddIcon color="inherit" />
        </Box>
      </ListItemIcon>
      <Box color="primary.main">
        <ListItemText
          primaryTypographyProps={{ color: "inherit" }}
          primary="Create New List"
        />
      </Box>
    </ListItem>
  );
};
