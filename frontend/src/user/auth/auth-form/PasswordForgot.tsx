import { Box, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React from "react";
import { useSnackbar } from "../../../app/snackbar/redux/snackbar";
import LoadingDialog from "../../../common/components/LoadingDialog";
import { SubmitButton } from "../../../common/components/SubmitButton";
import useBoolean from "../../../common/hooks/useBoolean";
import { User } from "../../query";
import { postForgotPassword } from "./query";

export default ({ user }: { user: User }) => {
  const isSending = useBoolean(false);
  const hasSentEmail = useBoolean(false);

  const snackbar = useSnackbar();

  const handleSubmit = async () => {
    try {
      isSending.setTrue();
      await postForgotPassword({
        emailAddress: user.emailAddress,
        redirectUrl: window.location.origin + "/auth",
      });
      hasSentEmail.setTrue();

      snackbar.display({
        message: "Password reset email sent",
      });
    } catch (error) {
      snackbar.display({
        message: "Something went wrong",
      });
    } finally {
      isSending.setFalse();
    }
  };

  return (
    <React.Fragment>
      <LoadingDialog
        open={isSending.value}
        ListItemTextProps={{ primary: "Sending" }}
      />
      {hasSentEmail.value ? (
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
      ) : (
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

          <SubmitButton fullWidth onClick={handleSubmit}>
            Send Email
          </SubmitButton>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
