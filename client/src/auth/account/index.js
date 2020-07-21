import React, { useState } from "react";
import {
  Box,
  Avatar,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router";
import JSONPretty from "react-json-pretty";
import useBoolean from "../../common/hooks/useBoolean";
import { useSnackbar } from "notistack";

const DeleteAccount = () => {
  const firebase = useFirebase();
  const open = useBoolean();
  const [error, setError] = useState({});

  const handleDeleteAccount = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      user
        .delete()
        .then(() => {
          console.log("user deleted!");
          open.setFalse();
        })
        .catch((error) => {
          setError(error);
          console.error(error);
        });
    }
  };

  return (
    <Box color="error.main">
      <Dialog open={open.value} onClose={open.setFalse}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          Are you sure you want to permanently delete your account?{" "}
          {error.message}
        </DialogContent>

        <DialogActions>
          <Button onClick={open.setFalse}>Cancel</Button>
          <Box color="error.main">
            <Button
              variant="contained"
              color="inherit"
              onClick={handleDeleteAccount}
            >
              Delete
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Button variant="contained" color="inherit" onClick={open.setTrue}>
        Delete Account
      </Button>
    </Box>
  );
};
export default () => {
  const history = useHistory();
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const { enqueueSnackbar } = useSnackbar();
  const logout = () => {
    firebase.logout().then((result) => {
      enqueueSnackbar(`${auth.email} signed out`, { variant: "info" });
    });
  };
  const signIn = () => {
    history.push("/signIn");
  };

  return (
    <Box>
      <Avatar style={{ backgroundColor: "white" }} src={auth.photoURL} />
      <Typography>{auth.displayName}</Typography>
      <Typography>{auth.email}</Typography>

      <Button onClick={logout}>Sign Out</Button>
      <Button onClick={signIn}>Sign In</Button>
      <DeleteAccount />
    </Box>
  );
};
