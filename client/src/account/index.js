import React from "react";
import { Box, Avatar, Button, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

export default () => {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const logout = () => {
    firebase.logout();
  };

  return (
    <Box>
      <Avatar style={{ backgroundColor: "white" }} src={auth.photoURL} />
      <Typography>{auth.displayName}</Typography>
      <Button onClick={logout}>Logout</Button>
    </Box>
  );
};
