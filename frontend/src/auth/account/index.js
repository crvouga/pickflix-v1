import {
  Avatar,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useBoolean from "../../common/hooks/useBoolean";
import auth from "../redux";
import DeleteUserModal from "./DeleteUserModal";
import Todo from "./Todo";
import PrettyJSON from "react-json-pretty";
import Cookies from "js-cookie";

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

  const handleDeleteUser = () => {
    dispatch(auth.actions.deleteUser());
    open.setFalse();
  };

  return (
    <div>
      {/* {error && (
        <Alert style={{ maxWidth: "100%" }} severity="error">
          <PrettyJSON data={error.response?.data} />
          <PrettyJSON data={{ cookies: Cookies.get() }} />
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
      <DeleteUserModal
        DialogProps={{ open: open.value, onClose: open.setFalse }}
        onDelete={handleDeleteUser}
      />
      <Todo />
    </div>
  );
};
