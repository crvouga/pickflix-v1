import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { push } from "connected-react-router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useBoolean from "../../common/hooks/useBoolean";
import auth from "../redux";
import DeleteAccountModal from "./DeleteAccountModal";
import Todo from "./Todo";

export default () => {
  const dispatch = useDispatch();
  const user = useSelector(auth.selectors.user);
  const status = useSelector(auth.selectors.status);
  const error = useSelector(auth.selectors.error);
  const open = useBoolean();

  const handleSignOut = () => {
    dispatch(auth.actions.signOut());
  };

  const handleSignIn = () => {
    dispatch(push("/signIn"));
  };

  const handleDeleteAccount = () => {
    dispatch(auth.actions.deleteAccount());
    open.setFalse();
  };

  return (
    <div>
      {/* {error && (
        <Alert style={{ maxWidth: "100%" }} severity="error">
          {JSON.stringify(error)}
        </Alert>
      )} */}
      {status === "loading" && <LinearProgress />}
      <List>
        {user && (
          <ListItem divider>
            <ListItemAvatar>
              <Avatar
                style={{ backgroundColor: "white" }}
                src={user.photoURL}
              />
            </ListItemAvatar>
            <ListItemText primary={user.displayName} secondary={user.email} />
          </ListItem>
        )}

        <ListItem button onClick={handleSignIn}>
          <ListItemText primary="Sign In" />
        </ListItem>
        <ListItem button onClick={handleSignOut} divider>
          <ListItemText primary="Sign Out" />
        </ListItem>
        <Box color="error.main">
          <ListItem button onClick={open.setTrue}>
            <ListItemText primary="Delete Account" />
          </ListItem>
        </Box>
      </List>
      <DeleteAccountModal
        DialogProps={{ open: open.value, onClose: open.setFalse }}
        onDeleteAccount={handleDeleteAccount}
      />
      <Todo />
    </div>
  );
};
