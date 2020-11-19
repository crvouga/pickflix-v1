import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import { signOut } from "../auth/query/mutations";
import ResponsiveDialogDrawer from "../common/components/ResponsiveDialogDrawer";

export default ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const handleClickSignOut = async () => {
    await signOut();
  };

  return (
    <ResponsiveDialogDrawer open={open} onClose={onClose}>
      <List>
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
