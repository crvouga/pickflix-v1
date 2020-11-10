import { Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useAuth } from "../auth/useAuth";

export default ({
  emailAddress,
  username,
}: {
  emailAddress: string;
  username: string;
}) => {
  const auth = useAuth();

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [displayName, setDisplayName] = useState("");

  const disabled = password !== passwordRepeat;

  const handleSubmit = async () => {
    await auth.signUp({
      emailAddress,
      username,
      password,
      displayName,
    });
  };

  return (
    <React.Fragment>
      <Box paddingBottom={2}>
        <Typography variant="h5" align="center">
          Create an account
        </Typography>
      </Box>

      <Box paddingBottom={2}>
        <Typography align="center">{emailAddress}</Typography>
        <Typography align="center">{username}</Typography>
      </Box>

      {/* <Box paddingBottom={2}>
        <TextField
          type="name"
          autoFocus
          variant="outlined"
          label="Display Name"
          fullWidth
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
        />
      </Box> */}

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

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        disabled={disabled}
      >
        Create Account
      </Button>
    </React.Fragment>
  );
};
