import { Box, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import useModal from "../../../../app/modals/useModal";
import { MediaId } from "../../../../media/tmdb/types";
import useCreateListWithListItemsForm from "../../create-list-with-list-items-form/useCreateListWithListItemsForm";

export const CreateListButton = ({ mediaId }: { mediaId?: MediaId }) => {
  const { open } = useModal("CreateListWithListItemsForm");
  const { setMediaIds } = useCreateListWithListItemsForm();

  const handleClick = () => {
    if (mediaId) {
      setMediaIds([mediaId]);
    }
    open();
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
