import { Box, Typography } from "@material-ui/core";
import React from "react";
import { SubmitButton } from "../../../common/components/SubmitButton";
import {
  PasswordRepeatTextField,
  PasswordTextField,
  usePasswordRepeatTextFieldState,
  usePasswordTextFieldState,
} from "../../forms/PasswordTextField";
import { signUp } from "../query/mutations";

export default ({
  emailAddress,
  username,
}: {
  emailAddress: string;
  username: string;
}) => {
  const passwordTextFieldState = usePasswordTextFieldState();
  const passwordRepeatTextFieldState = usePasswordRepeatTextFieldState(
    passwordTextFieldState
  );

  const disabled = !(
    passwordTextFieldState.isValid && passwordRepeatTextFieldState.isValid
  );

  const handleSubmit = async () => {
    await signUp({
      emailAddress,
      username,
      password: passwordTextFieldState.password,
      displayName: passwordRepeatTextFieldState.passwordRepeat,
    });
  };

  return (
    <React.Fragment>
      <Typography align="center" variant="h6">
        {emailAddress}
      </Typography>
      <Typography align="center" gutterBottom variant="h6">
        {username}
      </Typography>

      <Box paddingBottom={2}>
        <PasswordTextField state={passwordTextFieldState} />
      </Box>

      <Box paddingBottom={2}>
        <PasswordRepeatTextField state={passwordRepeatTextFieldState} />
      </Box>

      <SubmitButton onClick={handleSubmit} fullWidth disabled={disabled}>
        Create Account
      </SubmitButton>
    </React.Fragment>
  );
};
