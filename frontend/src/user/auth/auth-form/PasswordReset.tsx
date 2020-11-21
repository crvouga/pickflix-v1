import { Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSnackbar } from "../../../app/modals/redux/snackbar";
import { putPasswordReset } from "./query";
import { useHistory } from "react-router";

export default ({
  emailAddress,
  resetPasswordToken,
}: {
  emailAddress: string;
  resetPasswordToken: string;
}) => {
  const history = useHistory();
  const snacknar = useSnackbar();

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const disabled =
    newPassword !== newPasswordRepeat || newPassword.length === 0;

  const handleSubmit = async () => {
    try {
      await putPasswordReset({
        resetPasswordToken,
        newPassword,
      });
      snacknar.display({
        message: "Password was changed",
      });
      history.push(`/auth?emailAddress=${emailAddress}`);
    } catch (error) {
      snacknar.display({
        message: "Something went wrong",
      });
    }
  };

  return (
    <React.Fragment>
      <Box paddingBottom={2}>
        <Typography variant="h5" align="center">
          Reset Password
        </Typography>
        <Typography align="center" variant="h6">
          {emailAddress}
        </Typography>
      </Box>

      <Box paddingBottom={2}>
        <TextField
          variant="outlined"
          type="password"
          label="New Password"
          fullWidth
          autoCorrect="off"
          autoCapitalize="none"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
      </Box>

      <Box paddingBottom={2}>
        <TextField
          variant="outlined"
          type="password"
          label="Repeat New Password"
          fullWidth
          autoCorrect="off"
          autoCapitalize="none"
          helperText={
            newPassword !== newPasswordRepeat ? "Does not match password" : ""
          }
          onChange={(e) => {
            setNewPasswordRepeat(e.target.value);
          }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        disabled={disabled}
      >
        Reset Password
      </Button>
    </React.Fragment>
  );
};
