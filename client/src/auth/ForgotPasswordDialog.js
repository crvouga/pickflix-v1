import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import AuthenticationContext from "./AuthContext";

export default () => {
  return (
    <Dialog open={false}>
      <DialogContent style={{ marginBottom: 20 }}>
        <DialogContentText>
          Enter your email and I'll send you a link to reset your password.
        </DialogContentText>
        <FormControl style={{ width: "100%" }}>
          <TextField label="Email" type="email" />
          <Button
            variant="contained"
            style={{ marginTop: 8, marginBottom: 8 }}
            fullWidth
          >
            Send
          </Button>
        </FormControl>
        <Typography
          align="center"
          style={{ marginTop: "12px" }}
          color="textSecondary"
        >
          Remember password?
        </Typography>
        <Button fullWidth variant="outlined">
          Login
        </Button>
      </DialogContent>
    </Dialog>
  );
};
