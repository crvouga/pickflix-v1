import { Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { signUp } from "../query/mutations";
import { SubmitButton } from "../../../common/components/SubmitButton";

export default ({
  emailAddress,
  username,
  displayName,
}: {
  emailAddress: string;
  username: string;
  displayName: string;
}) => {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const disabled = password !== passwordRepeat || password === "";

  const handleSubmit = async () => {
    await signUp({
      emailAddress,
      username,
      password,
      displayName,
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
        <TextField
          variant="outlined"
          type="password"
          label="Password"
          fullWidth
          autoCorrect="off"
          autoCapitalize="none"
          autoComplete="off"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Box>

      <Box paddingBottom={2}>
        <TextField
          variant="outlined"
          type="password"
          label="Repeat Password"
          fullWidth
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="none"
          helperText={
            password !== passwordRepeat ? "Does not match password" : ""
          }
          onChange={(e) => {
            setPasswordRepeat(e.target.value);
          }}
        />
      </Box>

      <SubmitButton onClick={handleSubmit} fullWidth disabled={disabled}>
        Create Account
      </SubmitButton>
    </React.Fragment>
  );
};
