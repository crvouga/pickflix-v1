import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import useModal from "../app/modals/useModal";
import ResponsiveDialogDrawer from "../common/components/ResponsiveDialogDrawer";
import { signOut } from "./auth/query/mutations";

export default ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const editUserFormModal = useModal("EditUserForm");

  const handleClickEditClick = () => {
    editUserFormModal.open();
    onClose();
  };

  const handleClickSignOut = async () => {
    await signOut();
  };

  return (
    <ResponsiveDialogDrawer open={open} onClose={onClose}>
      <List>
        <ListItem button onClick={handleClickEditClick}>
          <ListItemIcon>
            <EditOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItem>
        <ListItem button onClick={handleClickSignOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </ListItem>
        <ListItem button onClick={onClose}>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <ListItemText primary="Cancel" />
        </ListItem>
      </List>
    </ResponsiveDialogDrawer>
  );
};
