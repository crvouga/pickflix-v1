import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";
import LoginForm from "./LoginForm";
import EmailIcon from "@material-ui/icons/Email";

export default () => {
  return (
    <Dialog open={false}>
      <DialogTitle align="center">
        <Avatar style={{ width: 64, height: 64 }}>
          <EmailIcon style={{ width: "80%", height: "80%" }} />
        </Avatar>
      </DialogTitle>
      <DialogContent style={{ marginBottom: 24 }}>
        <LoginForm />
        <Typography
          align="center"
          color="textSecondary"
          style={{ marginTop: 12, fontWeight: "bold" }}
        >
          Don't have an account?
        </Typography>
        <Button fullWidth variant="outlined" onClick={() => {}}>
          register
        </Button>
      </DialogContent>
    </Dialog>
  );
};
