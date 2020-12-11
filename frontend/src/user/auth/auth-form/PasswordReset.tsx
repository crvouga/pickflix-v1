import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { useSnackbar } from "../../../app/snackbar/redux/snackbar";
import { SubmitButton } from "../../../common/components/SubmitButton";
import {
  PasswordRepeatTextField,
  PasswordTextField,
  usePasswordRepeatTextFieldState,
  usePasswordTextFieldState,
} from "../../forms/PasswordTextField";
import { putPasswordReset } from "./query";

export default ({
  emailAddress,
  resetPasswordToken,
}: {
  emailAddress: string;
  resetPasswordToken: string;
}) => {
  const history = useHistory();
  const snacknar = useSnackbar();

  const passwordTextFieldState = usePasswordTextFieldState();
  const passwordRepeatTextFieldState = usePasswordRepeatTextFieldState(
    passwordTextFieldState
  );

  const disabled = !(
    passwordTextFieldState.isValid && passwordRepeatTextFieldState.isValid
  );

  const handleSubmit = async () => {
    try {
      await putPasswordReset({
        resetPasswordToken,
        newPassword: passwordTextFieldState.password,
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
        <PasswordTextField state={passwordTextFieldState} />
      </Box>

      <Box paddingBottom={2}>
        <PasswordRepeatTextField state={passwordRepeatTextFieldState} />
      </Box>

      <SubmitButton onClick={handleSubmit} fullWidth disabled={disabled}>
        Reset Password
      </SubmitButton>
    </React.Fragment>
  );
};
