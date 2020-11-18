import { Box, Button, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React, { useState } from "react";
import { User } from "../../users/query";
import { useSnackbar } from "../../snackbar/redux/snackbar";
import { postForgotPassword } from "./query";

export default ({ user }: { user: User }) => {
  const [hasSentEmail, setHasSentEmail] = useState(false);

  const snackbar = useSnackbar();

  const handleSubmit = async () => {
    try {
      await postForgotPassword({
        emailAddress: user.emailAddress,
        redirectUrl: window.location.origin + "/auth",
      });

      setHasSentEmail(true);

      snackbar.display({
        message: "Password reset email sent",
      });
    } catch (error) {
      snackbar.display({
        message: "Something went wrong",
      });
    }
  };

  if (hasSentEmail) {
    return (
      <React.Fragment>
        <Box paddingBottom={2}>
          <Typography align="center" variant="h5">
            Email Sent to {user.emailAddress}
          </Typography>
        </Box>
        <Box
          color="success.main"
          paddingBottom={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CheckCircleIcon style={{ width: "100px", height: "100px" }} />
        </Box>
        <Box paddingBottom={2}>
          <Typography align="center" color="textSecondary">
            Be sure to check your spam folder if you cant find it.
          </Typography>
        </Box>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Box paddingBottom={2}>
        <Typography variant="h5" align="center">
          Reset Password
        </Typography>
      </Box>

      <Box paddingBottom={4}>
        <Typography align="center" variant="h6">
          Send email to {user.emailAddress}
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Send Email
      </Button>
    </React.Fragment>
  );
};
