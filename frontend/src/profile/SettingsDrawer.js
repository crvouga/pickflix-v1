import { Box, Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import useBoolean from "../common/hooks/useBoolean";
import { actions } from "../redux";
import DeleteDialog from "./DeleteDialog";

export default ({ DrawerProps }) => {
  const dispatch = useDispatch();
  const deleteDialogOpen = useBoolean();

  const handleSignOut = () => {
    dispatch(actions.auth.signOut());
    DrawerProps.onClose();
  };

  const handleSignIn = () => {
    dispatch(actions.modal.open("SignInDialog"));
    DrawerProps.onClose();
  };

  const handleDeleteUser = () => {
    dispatch(actions.auth.deleteUser());
    deleteDialogOpen.setFalse();
  };

  return (
    <React.Fragment>
      <DeleteDialog
        DialogProps={{
          open: deleteDialogOpen.value,
          onClose: deleteDialogOpen.setFalse,
        }}
        onDelete={handleDeleteUser}
      />
      <Drawer anchor="bottom" {...DrawerProps}>
        <List>
          <ListItem button onClick={handleSignIn}>
            <ListItemText primary="Sign In" />
          </ListItem>
          <ListItem button onClick={handleSignOut} divider>
            <ListItemText primary="Sign Out" />
          </ListItem>
          <Box color="error.main">
            <ListItem button onClick={deleteDialogOpen.setTrue}>
              <ListItemText primary="Delete Account" />
            </ListItem>
          </Box>
        </List>
      </Drawer>
    </React.Fragment>
  );
};
