import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";

import RegisterForm from "./RegisterForm";

export default () => {
  return (
    <Dialog open={false}>
      <DialogTitle align="center">
        Create an account
        {/* <Avatar style={{ width: 70, height: 70 }}></Avatar> */}
      </DialogTitle>
      <DialogContent style={{ paddingBottom: 24 }}>
        <RegisterForm />
        <Typography
          align="center"
          color="textSecondary"
          style={{ marginTop: 12, fontWeight: "bold" }}
        >
          Already have an account?
        </Typography>
        <Button fullWidth variant="outlined">
          login
        </Button>
      </DialogContent>
    </Dialog>
  );
};
