import { Avatar, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import React from "react";
import {
  createButton,
  GoogleLoginButton,
  FacebookLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";

const EmailLoginButton = createButton({
  text: "Login with email",
  icon: () => <EmailIcon />,
  iconFormat: (name) => `fa fa-${name}`,
  style: { background: "gray" },
  activeStyle: { background: "gray" },
});

export default () => {
  return (
    <Dialog open={false}>
      <DialogTitle align="center">
        <Avatar style={{ width: 64, height: 64 }}></Avatar>
      </DialogTitle>
      <DialogContent style={{ marginBottom: 24 }}>
        `{" "}
        {/* <GoogleLoginButton />
        <FacebookLoginButton />
        <TwitterLoginButton />` */}
        <EmailLoginButton onClick={() => {}} />
      </DialogContent>
    </Dialog>
  );
};
