import { Box, Typography } from "@material-ui/core";
import React from "react";
import { SubmitButton } from "../../../common/components/SubmitButton";
import {
  PasswordTextField,
  usePasswordTextFieldState,
} from "../../forms/PasswordTextField";
import { signUp } from "../query/mutations";

export default ({
  emailAddress,
  username,
  displayName,
}: {
  emailAddress: string;
  username: string;
  displayName: string;
}) => {
  const passwordTextFieldState = usePasswordTextFieldState();

  const disabled = !passwordTextFieldState.isValid;

  const handleSubmit = async () => {
    await signUp({
      emailAddress,
      username,
      displayName,
      password: passwordTextFieldState.password,
    });
  };

  return (
    <React.Fragment>
      <Typography align="center" gutterBottom variant="h5">
        Choose a password
      </Typography>
      <Typography align="center" variant="h6">
        {emailAddress}
      </Typography>
      <Typography align="center" gutterBottom variant="h6">
        {username}
      </Typography>

      <Box paddingBottom={2}>
        <PasswordTextField state={passwordTextFieldState} />
      </Box>

      <SubmitButton onClick={handleSubmit} fullWidth disabled={disabled}>
        Create Account
      </SubmitButton>
    </React.Fragment>
  );
};
