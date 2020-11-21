import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import ResponsiveDialogDrawer from "../../common/components/ResponsiveDialogDrawer";

export default ({
  open,
  onClose,
  onEdit,
  onDelete,
}: {
  open: boolean;
  onClose?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  return (
    <ResponsiveDialogDrawer open={open} onClose={onClose}>
      <List onClick={onClose}>
        {onEdit && (
          <ListItem button onClick={onEdit}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Review" />
          </ListItem>
        )}
        {onDelete && (
          <ListItem button onClick={onDelete}>
            <ListItemIcon>
              <DeleteForeverOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Delete Review" />
          </ListItem>
        )}
        {onClose && (
          <ListItem button onClick={onClose}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary="Cancel" />
          </ListItem>
        )}
      </List>
    </ResponsiveDialogDrawer>
  );
};
