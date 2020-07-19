import {
  Box,
  Container,
  Paper,
  Avatar,
  SvgIcon,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import React from "react";
import { useFirebase } from "react-redux-firebase";

import { createButton, GoogleLoginButton } from "react-social-login-buttons";
import EmailIcon from "@material-ui/icons/Email";
const EmailLoginButton = createButton({
  text: "Login with email",
  icon: () => <EmailIcon />,
  iconFormat: (name) => `fa fa-${name}`,
  style: { background: "gray" },
  activeStyle: { background: "gray" },
});

const googleIconURL =
  "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg";

const GoogleSignIn = (props) => (
  <Box
    display="flex"
    flexDirection="row"
    justifyContent="center"
    p={1}
    bgcolor="#4c8bf5"
    borderRadius="12px"
    {...props}
  >
    <Box marginRight={1}>
      <img style={{ width: "32px", height: "32px" }} src={googleIconURL} />
    </Box>
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Typography style={{ fontWeight: "bold" }}>
        Sign in with Google
      </Typography>
    </Box>
  </Box>
);

export default () => {
  const firebase = useFirebase();

  const handleGoogleLoginClick = () => {
    firebase.login({ provider: "google" });
  };
  const handleEmailLoginClick = () => {};

  return (
    <Box component={Paper} padding={4} maxWidth="360px" m="auto" marginTop={6}>
      <Box p={2}>
        <Avatar style={{ margin: "auto", width: "120px", height: "120px" }} />
      </Box>

      <Box p={1}>
        <GoogleSignIn onClick={handleGoogleLoginClick} />
      </Box>
      <Box p={1}>
        <EmailLoginButton onClick={handleEmailLoginClick} />
      </Box>
    </Box>
  );
};
